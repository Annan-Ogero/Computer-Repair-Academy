// ============================================================
// TEST ENGINE
// ============================================================

class TestEngine {
    constructor(app) {
        this.app = app;
        this.currentTest = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.timer = null;
        this.timeLeft = 0;
        this.isFinished = false;

        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('test-prev-btn')?.addEventListener('click', () => this.prevQuestion());
        document.getElementById('test-next-btn')?.addEventListener('click', () => this.nextQuestion());
        document.getElementById('test-submit-btn')?.addEventListener('click', () => this.submitTest());
    }

    startTest(unit) {
        if (!unit || !unit.test) return;

        this.currentTest = unit.test;
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(this.currentTest.questions.length).fill(null);
        this.isFinished = false;
        this.timeLeft = (this.currentTest.timeLimit || 20) * 60;

        this.app.showView('test');
        document.getElementById('test-title').textContent = `${unit.title} - Unit Test`;
        
        this.renderQuestion();
        this.startTimer();
    }

    startTimer() {
        if (this.timer) clearInterval(this.timer);
        
        const display = document.getElementById('test-timer-display');
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            
            const mins = Math.floor(this.timeLeft / 60);
            const secs = this.timeLeft % 60;
            if (display) {
                display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            }

            if (this.timeLeft <= 0) {
                this.submitTest(true);
            }
        }, 1000);
    }

    renderQuestion() {
        const question = this.currentTest.questions[this.currentQuestionIndex];
        const container = document.getElementById('test-content');
        if (!container) return;

        const progress = ((this.currentQuestionIndex + 1) / this.currentTest.questions.length) * 100;
        document.getElementById('test-progress-fill').style.width = progress + '%';
        document.getElementById('test-question-indicator').textContent = `Question ${this.currentQuestionIndex + 1} of ${this.currentTest.questions.length}`;

        let html = `
            <div class="question-card animate-in">
                <div class="question-number">Question ${this.currentQuestionIndex + 1} <span class="question-type type-${question.type}">${question.type.toUpperCase()}</span></div>
                <div class="question-text">${question.text}</div>
                <div class="answer-options">
        `;

        if (question.type === 'mcq') {
            html += question.options.map((opt, i) => `
                <div class="answer-option ${this.userAnswers[this.currentQuestionIndex] === i ? 'selected' : ''}" data-index="${i}">
                    <div class="option-letter">${String.fromCharCode(65 + i)}</div>
                    <div class="option-text">${opt}</div>
                </div>
            `).join('');
        } else if (question.type === 'tf') {
            html += `
                <div class="answer-option ${this.userAnswers[this.currentQuestionIndex] === true ? 'selected' : ''}" data-val="true">
                    <div class="option-letter">T</div>
                    <div class="option-text">True</div>
                </div>
                <div class="answer-option ${this.userAnswers[this.currentQuestionIndex] === false ? 'selected' : ''}" data-val="false">
                    <div class="option-letter">F</div>
                    <div class="option-text">False</div>
                </div>
            `;
        } else if (question.type === 'essay') {
            html += `<textarea class="essay-textarea" placeholder="Type your answer here...">${this.userAnswers[this.currentQuestionIndex] || ''}</textarea>`;
        }

        html += `</div></div>`;
        container.innerHTML = html;

        // Bind options
        container.querySelectorAll('.answer-option').forEach(opt => {
            opt.addEventListener('click', () => {
                container.querySelectorAll('.answer-option').forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                
                if (question.type === 'mcq') {
                    this.userAnswers[this.currentQuestionIndex] = parseInt(opt.dataset.index);
                } else if (question.type === 'tf') {
                    this.userAnswers[this.currentQuestionIndex] = opt.dataset.val === 'true';
                }
            });
        });

        const textarea = container.querySelector('.essay-textarea');
        textarea?.addEventListener('input', (e) => {
            this.userAnswers[this.currentQuestionIndex] = e.target.value;
        });

        // Nav buttons
        document.getElementById('test-prev-btn').classList.toggle('hidden', this.currentQuestionIndex === 0);
        const isLast = this.currentQuestionIndex === this.currentTest.questions.length - 1;
        document.getElementById('test-next-btn').classList.toggle('hidden', isLast);
        document.getElementById('test-submit-btn').classList.toggle('hidden', !isLast);
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.currentTest.questions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion();
        }
    }

    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
        }
    }

    submitTest(auto = false) {
        if (this.isFinished) return;
        this.isFinished = true;
        clearInterval(this.timer);

        if (!auto && this.userAnswers.includes(null)) {
            if (!confirm('You have unanswered questions. Are you sure you want to submit?')) {
                this.isFinished = false;
                this.startTimer();
                return;
            }
        }

        this.calculateResults();
    }

    calculateResults() {
        let score = 0;
        const total = this.currentTest.questions.length;
        const results = [];

        this.currentTest.questions.forEach((q, i) => {
            const userAns = this.userAnswers[i];
            let isCorrect = false;
            
            if (q.type === 'mcq' || q.type === 'tf') {
                isCorrect = userAns === q.correct;
                if (isCorrect) score++;
            } else {
                // Essay/Practical are self-graded or AI graded in a real app
                // For this demo, we'll give partial credit if they wrote something
                isCorrect = userAns && userAns.length > 20;
                if (isCorrect) score += 0.8;
            }
            
            results.push({
                question: q.text,
                userAnswer: userAns,
                correctAnswer: q.correct,
                isCorrect: isCorrect,
                explanation: q.explanation
            });
        });

        const finalScore = Math.round((score / total) * 100);
        const passed = finalScore >= (this.currentTest.passingScore || 70);

        this.showResults(finalScore, passed, results);
    }

    showResults(score, passed, results) {
        this.app.showView('results');
        const container = document.getElementById('results-content');
        
        if (passed) {
            this.app.state.unitsCompleted.push(this.app.state.currentUnit.id);
            this.app.state.testsPassed.push(this.app.state.currentUnit.id);
            this.app.state.xp += 100;
            this.app.checkAchievements();
            this.app.saveState();
        }

        container.innerHTML = `
            <div class="result-card animate-in">
                <div class="result-icon">${passed ? '🎉' : '❌'}</div>
                <h2>${passed ? 'Congratulations!' : 'Keep Practicing!'}</h2>
                <div class="result-score ${passed ? 'passed' : 'failed'}">${score}%</div>
                <p class="result-message">
                    ${passed ? 'You have successfully passed the test and unlocked the next unit.' : 'You didn\'t reach the passing score of 70%. Review the unit content and try again.'}
                </p>
                <div class="result-actions">
                    <button id="results-dashboard-btn" class="btn btn-primary">Back to Dashboard</button>
                    ${!passed ? '<button id="results-retry-btn" class="btn btn-secondary">Retry Test</button>' : ''}
                </div>
            </div>
        `;

        document.getElementById('results-dashboard-btn').addEventListener('click', () => {
            this.app.showView('dashboard');
            this.app.renderDashboard();
            this.app.renderSidebar();
        });

        document.getElementById('results-retry-btn')?.addEventListener('click', () => {
            this.startTest(this.app.state.currentUnit);
        });
    }
}

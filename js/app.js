// ============================================================
// MAIN APPLICATION CONTROLLER
// ============================================================

class App {
    constructor() {
        this.state = {
            currentView: 'dashboard',
            currentUnit: null,
            currentSection: 0,
            unitsCompleted: [],
            testsPassed: [],
            xp: 0,
            streak: 0,
            studyTime: 0,
            achievements: [],
            bookmarks: [],
            notes: [],
            userName: 'Student',
            userLevel: 'beginner',
            fontSize: 16,
            theme: 'dark',
            lastStudyDate: null
        };

        this.loadState();
        this.init();
    }

    init() {
        // Splash screen
        setTimeout(() => {
            document.getElementById('splash-screen').classList.add('fade-out');
            setTimeout(() => {
                document.getElementById('splash-screen').style.display = 'none';
                document.getElementById('app').classList.remove('hidden');
                this.onReady();
            }, 800);
        }, 2800);
    }

    onReady() {
        this.renderSidebar();
        this.renderDashboard();
        this.renderGlossary();
        this.renderBookmarks();
        this.bindEvents();
        this.initTeacher();
        this.updateUI();
        this.startStudyTimer();

        // Initialize sub-systems
        if (window.AIAssistant) {
            window.aiAssistant = new window.AIAssistant();
        }
        window.ttsEngine = new TTSEngine();
        window.notesEditor = new NotesEditor(this);
        window.labSimulator = new LabSimulator();
        window.testEngine = new TestEngine(this);

        // Check streak
        this.checkStreak();

        // Show profile modal if first visit
        if (!localStorage.getItem('cra_profile_set')) {
            this.showModal('profile-modal');
        }
    }

    // ---- STATE MANAGEMENT ----
    loadState() {
        const saved = localStorage.getItem('cra_state');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                Object.assign(this.state, parsed);
            } catch(e) { console.warn('State load error:', e); }
        }
    }

    saveState() {
        localStorage.setItem('cra_state', JSON.stringify(this.state));
    }

    // ---- EVENT BINDING ----
    bindEvents() {
        // Sidebar toggle
        document.getElementById('sidebar-toggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('collapsed');
            document.getElementById('sidebar').classList.toggle('open');
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', this.state.theme);
            const icon = document.querySelector('#theme-toggle i');
            if (icon) icon.className = this.state.theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            this.saveState();
        });

        // Font size
        document.getElementById('font-size-btn').addEventListener('click', () => {
            this.showModal('fontsize-modal');
        });
        document.getElementById('fontsize-slider')?.addEventListener('input', (e) => {
            this.state.fontSize = parseInt(e.target.value);
            document.documentElement.style.fontSize = this.state.fontSize + 'px';
            document.getElementById('fontsize-display').textContent = this.state.fontSize + 'px';
            this.saveState();
        });

        // Profile
        document.getElementById('user-profile-btn').addEventListener('click', () => {
            this.showModal('profile-modal');
        });
        document.getElementById('save-profile')?.addEventListener('click', () => {
            this.state.userName = document.getElementById('profile-name').value || 'Student';
            this.state.userLevel = document.getElementById('profile-level').value;
            localStorage.setItem('cra_profile_set', 'true');
            this.closeAllModals();
            this.updateUI();
            this.saveState();
            this.showToast('Profile saved!', 'success');
        });

        // Navigation
        document.getElementById('back-to-dashboard')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showView('dashboard');
        });
        document.getElementById('start-learning-btn')?.addEventListener('click', () => {
            this.openUnit(this.getNextUnit());
        });
        document.getElementById('continue-learning-btn')?.addEventListener('click', () => {
            this.openUnit(this.getNextUnit());
        });

        // Sidebar tabs
        document.querySelectorAll('.stab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.sidebar-tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });

        // Level filter
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterUnits(btn.dataset.level);
            });
        });

        // Unit navigation
        document.getElementById('prev-section-btn')?.addEventListener('click', () => this.prevSection());
        document.getElementById('next-section-btn')?.addEventListener('click', () => this.nextSection());

        // Teacher controls
        document.getElementById('teacher-speak-btn')?.addEventListener('click', () => this.speakTeacher());
        document.getElementById('teacher-pause-btn')?.addEventListener('click', () => window.ttsEngine?.pause());
        document.getElementById('teacher-next-btn')?.addEventListener('click', () => this.nextSection());

        // Unit action buttons
        document.getElementById('unit-bookmark-btn')?.addEventListener('click', () => this.toggleBookmark());
        document.getElementById('unit-voice-btn')?.addEventListener('click', () => this.readUnitAloud());
        document.getElementById('unit-notes-btn')?.addEventListener('click', () => this.showView('notes'));
        document.getElementById('unit-sim-btn')?.addEventListener('click', () => this.openLab());

        // Test
        document.getElementById('take-test-btn')?.addEventListener('click', () => this.startTest());

        // Lab
        document.getElementById('lab-close-btn')?.addEventListener('click', () => this.showView('unit'));
        document.getElementById('lab-device-select')?.addEventListener('change', (e) => {
            window.labSimulator?.loadDevice(e.target.value);
        });
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                window.labSimulator?.setTool(btn.dataset.tool);
            });
        });

        // Modal close
        document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
            el.addEventListener('click', () => this.closeAllModals());
        });

        // AI toggle
        document.getElementById('ai-toggle-btn')?.addEventListener('click', () => {
            window.aiAssistant?.toggle();
        });
    }

    // ---- VIEW MANAGEMENT ----
    showView(viewName) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`${viewName}-view`)?.classList.add('active');
        this.state.currentView = viewName;
        window.scrollTo(0, 0);
    }

    // ---- SIDEBAR RENDERING ----
    renderSidebar() {
        const list = document.getElementById('units-list');
        if (!list) return;

        list.innerHTML = UNITS_DATA.map(unit => {
            const isCompleted = this.state.unitsCompleted.includes(unit.id);
            const isLocked = unit.id > 1 && !this.state.unitsCompleted.includes(unit.id - 1) && !isCompleted;
            const isCurrent = this.state.currentUnit?.id === unit.id;

            const statusClass = isCompleted ? 'completed' : isLocked ? 'locked' : isCurrent ? 'current' : '';
            const levelClass = `level-${unit.level}`;

            return `
                <div class="unit-card ${statusClass}" data-unit-id="${unit.id}" data-level="${unit.level}">
                    ${isLocked ? '<i class="fas fa-lock lock-icon"></i>' : ''}
                    <div class="unit-card-header">
                        <div class="unit-number">${isCompleted ? '<i class="fas fa-check" style="font-size:0.7rem"></i>' : unit.id}</div>
                        <div class="unit-card-title">${unit.title}</div>
                    </div>
                    <div class="unit-card-meta">
                        <span class="unit-card-level ${levelClass}">${unit.level}</span>
                        <span><i class="fas fa-clock"></i> ${unit.duration}</span>
                    </div>
                </div>
            `;
        }).join('');

        list.querySelectorAll('.unit-card').forEach(card => {
            card.addEventListener('click', () => {
                const unitId = parseInt(card.dataset.unitId);
                if (card.classList.contains('locked')) {
                    this.showToast('Complete the previous unit to unlock this one!', 'warning');
                    return;
                }
                this.openUnit(UNITS_DATA.find(u => u.id === unitId));
            });
        });
    }

    filterUnits(level) {
        document.querySelectorAll('.unit-card').forEach(card => {
            if (level === 'all' || card.dataset.level === level) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // ---- DASHBOARD ----
    renderDashboard() {
        this.updateStats();
        this.renderAchievements();
        this.renderProgressChart();

        const hasProgress = this.state.unitsCompleted.length > 0;
        document.getElementById('start-learning-btn')?.classList.toggle('hidden', hasProgress);
        document.getElementById('continue-learning-btn')?.classList.toggle('hidden', !hasProgress);
    }

    updateStats() {
        document.getElementById('stat-units-completed').textContent = this.state.unitsCompleted.length;
        document.getElementById('stat-tests-passed').textContent = this.state.testsPassed.length;
        document.getElementById('stat-xp').textContent = this.state.xp;
        document.getElementById('stat-streak').textContent = this.state.streak;
        document.getElementById('stat-time').textContent = Math.floor(this.state.studyTime / 3600) + 'h';

        const rank = this.getRank();
        document.getElementById('stat-rank').textContent = rank.icon + ' ' + rank.name;
        document.getElementById('xp-badge').textContent = this.state.xp + ' XP';
        document.getElementById('user-name-display').textContent = this.state.userName;

        const pct = Math.round((this.state.unitsCompleted.length / UNITS_DATA.length) * 100);
        document.getElementById('overall-progress-text').textContent = pct + '%';
        const circle = document.getElementById('overall-progress-ring');
        if (circle) {
            const offset = 220 - (220 * pct / 100);
            circle.style.strokeDashoffset = offset;
        }
    }

    getRank() {
        let rank = RANKS[0];
        for (const r of RANKS) {
            if (this.state.xp >= r.minXp) rank = r;
        }
        return rank;
    }

    getNextUnit() {
        for (const unit of UNITS_DATA) {
            if (!this.state.unitsCompleted.includes(unit.id)) return unit;
        }
        return UNITS_DATA[0];
    }

    renderAchievements() {
        const grid = document.getElementById('achievements-grid');
        if (!grid) return;
        grid.innerHTML = ACHIEVEMENTS.map(ach => {
            const unlocked = this.state.achievements.includes(ach.id);
            return `
                <div class="achievement-item ${unlocked ? 'unlocked' : 'locked'}" title="${ach.desc}">
                    <div class="ach-icon">${ach.icon}</div>
                    <div class="ach-name">${ach.name}</div>
                </div>
            `;
        }).join('');
    }

    renderProgressChart() {
        const canvas = document.getElementById('progress-chart');
        if (!canvas || !window.Chart) return;
        
        const ctx = canvas.getContext('2d');
        const levels = ['beginner', 'intermediate', 'advanced', 'professional'];
        const data = levels.map(level => {
            const total = UNITS_DATA.filter(u => u.level === level).length;
            const completed = UNITS_DATA.filter(u => u.level === level && this.state.unitsCompleted.includes(u.id)).length;
            return { level, total, completed };
        });

        if (this.progressChart) this.progressChart.destroy();
        this.progressChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.level.charAt(0).toUpperCase() + d.level.slice(1)),
                datasets: [
                    { label: 'Completed', data: data.map(d => d.completed), backgroundColor: '#6c63ff' },
                    { label: 'Remaining', data: data.map(d => d.total - d.completed), backgroundColor: '#2a2a45' }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { stacked: true, ticks: { color: '#a0a0b8' } },
                    y: { stacked: true, ticks: { color: '#a0a0b8' } }
                }
            }
        });
    }

    // ---- UNIT VIEW ----
    openUnit(unit) {
        if (!unit) return;
        this.state.currentUnit = unit;
        this.state.currentSection = 0;
        this.showView('unit');

        document.getElementById('unit-title').textContent = unit.title;
        document.getElementById('unit-breadcrumb-title').textContent = unit.title;
        document.getElementById('unit-duration').textContent = unit.duration;
        document.getElementById('unit-difficulty').textContent = unit.level;

        const levelBadge = document.getElementById('unit-level-badge');
        levelBadge.textContent = unit.level;
        levelBadge.className = `level-badge level-${unit.level}`;

        const sectionCount = unit.sections?.length || 0;
        document.getElementById('unit-section-count').textContent = sectionCount;

        this.renderCurrentSection();
        this.updateSectionNav();

        document.querySelectorAll('.unit-card').forEach(card => {
            card.classList.remove('current');
            if (parseInt(card.dataset.unitId) === unit.id) card.classList.add('current');
        });

        this.saveState();
    }

    renderCurrentSection() {
        const unit = this.state.currentUnit;
        if (!unit) return;

        if (!unit.sections || unit.sections.length === 0) {
            document.getElementById('unit-content').innerHTML = `
                <div class="info-box note">
                    <i class="fas fa-info-circle"></i>
                    <div><strong>Content Loading:</strong> This unit's detailed content is being prepared.</div>
                </div>
                <h2>${unit.title}</h2>
                <p>Use the AI Assistant to learn about this topic in depth.</p>
            `;
            document.getElementById('take-test-container')?.classList.remove('hidden');
            return;
        }

        const section = unit.sections[this.state.currentSection];
        document.getElementById('unit-content').innerHTML = `
            <div class="unit-section animate-in">
                <h2>${section.title}</h2>
                ${section.content}
            </div>
        `;

        if (section.teacherScript) {
            document.getElementById('teacher-text').textContent = section.teacherScript;
        }

        const pct = ((this.state.currentSection + 1) / unit.sections.length) * 100;
        document.getElementById('unit-progress-fill').style.width = pct + '%';

        const isLastSection = this.state.currentSection >= unit.sections.length - 1;
        document.getElementById('take-test-container')?.classList.toggle('hidden', !isLastSection);
    }

    updateSectionNav() {
        const unit = this.state.currentUnit;
        const total = unit?.sections?.length || 1;
        const current = this.state.currentSection + 1;

        document.getElementById('section-indicator').textContent = `Section ${current} of ${total}`;
        document.getElementById('prev-section-btn').disabled = this.state.currentSection === 0;
        document.getElementById('next-section-btn').disabled = this.state.currentSection === total - 1;
    }

    prevSection() {
        if (this.state.currentSection > 0) {
            this.state.currentSection--;
            this.renderCurrentSection();
            this.updateSectionNav();
        }
    }

    nextSection() {
        const unit = this.state.currentUnit;
        if (this.state.currentSection < (unit?.sections?.length || 1) - 1) {
            this.state.currentSection++;
            this.renderCurrentSection();
            this.updateSectionNav();
        }
    }

    // ---- UTILS ----
    showModal(id) {
        document.getElementById(id)?.classList.remove('hidden');
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    }

    showToast(msg, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas fa-info-circle"></i> ${msg}`;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }

    initTeacher() {
        window.cartoonTeacher = new CartoonTeacher('teacher-character');
        window.welcomeTeacher = new CartoonTeacher('welcome-character');
    }

    updateUI() {
        document.getElementById('user-name-display').textContent = this.state.userName;
        document.documentElement.setAttribute('data-theme', this.state.theme);
        document.documentElement.style.fontSize = this.state.fontSize + 'px';
    }

    startStudyTimer() {
        setInterval(() => {
            this.state.studyTime++;
            if (this.state.studyTime % 60 === 0) this.saveState();
        }, 1000);
    }

    checkStreak() {
        const today = new Date().toDateString();
        if (this.state.lastStudyDate !== today) {
            if (this.state.lastStudyDate) {
                const last = new Date(this.state.lastStudyDate);
                const diff = (new Date(today) - last) / (1000 * 60 * 60 * 24);
                if (diff === 1) this.state.streak++;
                else if (diff > 1) this.state.streak = 1;
            } else {
                this.state.streak = 1;
            }
            this.state.lastStudyDate = today;
            this.saveState();
        }
    }

    renderGlossary() {
        const list = document.getElementById('glossary-list');
        if (!list) return;
        list.innerHTML = GLOBAL_GLOSSARY.map(item => `
            <div class="glossary-item">
                <div class="glossary-term">${item.term}</div>
                <div class="glossary-def">${item.definition}</div>
            </div>
        `).join('');
    }

    startTest() {
        window.testEngine?.startTest(this.state.currentUnit);
    }

    startVoiceNavigation() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            this.showToast('Voice recognition not supported in this browser', 'warning');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            this.showToast('Listening for commands...', 'info');
            document.getElementById('voice-nav-btn').classList.add('active');
        };

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            console.log('Voice command:', command);

            if (command.includes('dashboard') || command.includes('home')) {
                this.showView('dashboard');
            } else if (command.includes('unit')) {
                const num = command.match(/\d+/);
                if (num) {
                    const unit = UNITS_DATA.find(u => u.id === parseInt(num[0]));
                    if (unit) this.openUnit(unit);
                }
            } else if (command.includes('test')) {
                this.startTest();
            } else if (command.includes('ai') || command.includes('bot')) {
                window.aiAssistant?.toggle();
            }
        };

        recognition.onend = () => {
            document.getElementById('voice-nav-btn').classList.remove('active');
        };

        recognition.onerror = () => {
            this.showToast('Voice recognition error', 'error');
            document.getElementById('voice-nav-btn').classList.remove('active');
        };

        recognition.start();
    }

    checkAchievements() {
        ACHIEVEMENTS.forEach(ach => {
            if (this.state.achievements.includes(ach.id)) return;
            
            let unlocked = false;
            if (ach.id === 'first_unit' && this.state.unitsCompleted.length >= 1) unlocked = true;
            if (ach.id === 'five_units' && this.state.unitsCompleted.length >= 5) unlocked = true;
            if (ach.id === 'ten_units' && this.state.unitsCompleted.length >= 10) unlocked = true;
            if (ach.id === 'streak_3' && this.state.streak >= 3) unlocked = true;
            if (ach.id === 'note_taker' && this.state.notes.length >= 1) unlocked = true;
            
            if (unlocked) {
                this.state.achievements.push(ach.id);
                this.state.xp += ach.xp;
                this.showAchievementPopup(ach);
                this.updateStats();
            }
        });
    }

    showAchievementPopup(ach) {
        document.getElementById('achievement-icon').textContent = ach.icon;
        document.getElementById('achievement-title').textContent = ach.name;
        document.getElementById('achievement-desc').textContent = ach.desc;
        document.getElementById('achievement-xp').textContent = `+${ach.xp} XP`;
        this.showModal('achievement-modal');
    }

    speakTeacher() {
        const text = document.getElementById('teacher-text')?.textContent;
        if (text) window.ttsEngine?.speak(text);
    }

    readUnitAloud() {
        const content = document.getElementById('unit-content')?.textContent;
        if (content) window.ttsEngine?.speak(content);
    }

    toggleBookmark() {
        if (!this.state.currentUnit) return;
        const id = this.state.currentUnit.id;
        const index = this.state.bookmarks.indexOf(id);
        if (index === -1) {
            this.state.bookmarks.push(id);
            this.showToast('Unit bookmarked!', 'success');
        } else {
            this.state.bookmarks.splice(index, 1);
            this.showToast('Bookmark removed', 'info');
        }
        this.renderBookmarks();
        this.saveState();
    }

    renderBookmarks() {
        const list = document.getElementById('bookmarks-list');
        if (!list) return;
        if (this.state.bookmarks.length === 0) {
            list.innerHTML = '<p class="empty-state">No bookmarks yet. Click the bookmark icon on any unit.</p>';
            return;
        }
        list.innerHTML = this.state.bookmarks.map(id => {
            const unit = UNITS_DATA.find(u => u.id === id);
            return `
                <div class="unit-card" data-unit-id="${unit.id}">
                    <div class="unit-card-header">
                        <div class="unit-card-title">${unit.title}</div>
                    </div>
                </div>
            `;
        }).join('');
        list.querySelectorAll('.unit-card').forEach(card => {
            card.addEventListener('click', () => {
                this.openUnit(UNITS_DATA.find(u => u.id === parseInt(card.dataset.unitId)));
            });
        });
    }

    openLab() {
        this.showView('lab');
        if (this.state.currentUnit?.labConfig) {
            window.labSimulator?.loadDevice(this.state.currentUnit.labConfig.device);
            this.renderLabTasks(this.state.currentUnit.labConfig.tasks);
        }
    }

    renderLabTasks(tasks) {
        const list = document.getElementById('lab-tasks-list');
        if (!list) return;
        list.innerHTML = tasks.map(task => `
            <div class="lab-task">
                <div class="task-check"><i class="fas fa-check"></i></div>
                <span>${task}</span>
            </div>
        `).join('');
    }

    handleSearch(query) {
        const results = document.getElementById('search-results');
        if (!results) return;
        if (!query.trim()) {
            results.classList.add('hidden');
            return;
        }
        const filtered = UNITS_DATA.filter(u => u.title.toLowerCase().includes(query.toLowerCase()));
        if (filtered.length === 0) {
            results.innerHTML = '<div class="search-result-item">No results found</div>';
        } else {
            results.innerHTML = filtered.map(u => `
                <div class="search-result-item" data-unit-id="${u.id}">
                    <div class="result-title">${u.title}</div>
                    <div class="result-desc">${u.level}</div>
                </div>
            `).join('');
            results.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.openUnit(UNITS_DATA.find(u => u.id === parseInt(item.dataset.unitId)));
                    results.classList.add('hidden');
                    document.getElementById('global-search').value = '';
                });
            });
        }
        results.classList.remove('hidden');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

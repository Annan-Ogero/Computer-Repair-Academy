import { GoogleGenAI } from "@google/genai";

// ============================================================
// AI ASSISTANT — POWERED BY GEMINI
// ============================================================

export class AIAssistant {
    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY;
        this.genAI = new GoogleGenAI({ apiKey: this.apiKey });
        this.model = "gemini-3-flash-preview";
        
        this.chat = null;
        this.isOpen = false;
        this.isMaximized = false;

        this.init();
    }

    init() {
        this.bindEvents();
        this.startNewChat();
    }

    startNewChat() {
        this.chat = this.genAI.chats.create({
            model: this.model,
            config: {
                systemInstruction: `You are TechBot, an expert computer repair assistant for the Computer Repair Academy. 
                Your goal is to help students learn about hardware, maintenance, and repair.
                Be encouraging, technical but accessible, and always prioritize safety.
                If a student asks about a dangerous task (like opening a PSU or CRT), warn them strongly.
                Use markdown for formatting. Keep responses concise but thorough.`
            }
        });
    }

    bindEvents() {
        const input = document.getElementById('ai-input');
        const sendBtn = document.getElementById('ai-send');
        const minimizeBtn = document.getElementById('ai-minimize');
        const maximizeBtn = document.getElementById('ai-maximize');
        const quickPrompts = document.querySelectorAll('.quick-prompt');

        sendBtn?.addEventListener('click', () => this.handleSendMessage());
        input?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });

        minimizeBtn?.addEventListener('click', () => this.toggle());
        maximizeBtn?.addEventListener('click', () => this.toggleMaximize());

        quickPrompts.forEach(btn => {
            btn.addEventListener('click', () => {
                const prompt = btn.dataset.prompt;
                if (input) {
                    input.value = prompt;
                    this.handleSendMessage();
                }
            });
        });
    }

    toggle() {
        const assistant = document.getElementById('ai-assistant');
        const toggleBtn = document.getElementById('ai-toggle-btn');
        
        this.isOpen = !this.isOpen;
        assistant?.classList.toggle('open', this.isOpen);
        toggleBtn?.classList.toggle('open', this.isOpen);
        
        if (this.isOpen) {
            document.getElementById('ai-input')?.focus();
            document.getElementById('ai-badge')?.classList.add('hidden');
        }
    }

    toggleMaximize() {
        const assistant = document.getElementById('ai-assistant');
        this.isMaximized = !this.isMaximized;
        assistant?.classList.toggle('maximized', this.isMaximized);
        
        const icon = document.querySelector('#ai-maximize i');
        if (icon) {
            icon.className = this.isMaximized ? 'fas fa-compress' : 'fas fa-expand';
        }
    }

    async handleSendMessage() {
        const input = document.getElementById('ai-input');
        const message = input.value.trim();
        if (!message) return;

        input.value = '';
        this.addMessage(message, 'user');
        
        const typingId = this.addTypingIndicator();
        
        try {
            const response = await this.chat.sendMessage({ message });
            this.removeTypingIndicator(typingId);
            this.addMessage(response.text, 'bot');
        } catch (error) {
            console.error('AI Error:', error);
            this.removeTypingIndicator(typingId);
            this.addMessage("I'm sorry, I encountered an error. Please try again.", 'bot');
        }
    }

    addMessage(text, sender) {
        const container = document.getElementById('ai-messages');
        if (!container) return;

        const msgDiv = document.createElement('div');
        msgDiv.className = `ai-msg ${sender}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'msg-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const content = document.createElement('div');
        content.className = 'msg-content';
        // Use marked for markdown if available, else fallback
        if (window.marked) {
            content.innerHTML = window.marked.parse(text);
        } else {
            content.textContent = text;
        }

        msgDiv.appendChild(avatar);
        msgDiv.appendChild(content);
        container.appendChild(msgDiv);
        
        container.scrollTop = container.scrollHeight;
    }

    addTypingIndicator() {
        const container = document.getElementById('ai-messages');
        const id = 'typing-' + Date.now();
        
        const indicator = document.createElement('div');
        indicator.id = id;
        indicator.className = 'ai-msg bot';
        indicator.innerHTML = `
            <div class="msg-avatar"><i class="fas fa-robot"></i></div>
            <div class="msg-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        container?.appendChild(indicator);
        container.scrollTop = container.scrollHeight;
        return id;
    }

    removeTypingIndicator(id) {
        document.getElementById(id)?.remove();
    }

    processTopicSuggestion(text) {
        // This could be used to generate a new unit or just acknowledge
        this.addMessage(`Thank you for the suggestion: "${text}". I'll pass this to the academy directors!`, 'bot');
    }
}

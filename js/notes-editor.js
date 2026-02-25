// ============================================================
// NOTES EDITOR
// ============================================================

class NotesEditor {
    constructor(app) {
        this.app = app;
        this.editor = document.getElementById('notes-editor');
        this.currentNoteId = null;

        this.init();
    }

    init() {
        this.bindEvents();
        this.renderNotesList();
    }

    bindEvents() {
        document.querySelectorAll('.note-tool').forEach(btn => {
            btn.addEventListener('click', () => {
                const cmd = btn.dataset.command;
                if (cmd) {
                    document.execCommand(cmd, false, null);
                }
            });
        });

        document.getElementById('note-heading')?.addEventListener('change', (e) => {
            document.execCommand('formatBlock', false, e.target.value);
        });

        document.getElementById('note-font-size')?.addEventListener('change', (e) => {
            document.execCommand('fontSize', false, e.target.value);
        });

        document.getElementById('note-text-color')?.addEventListener('input', (e) => {
            document.execCommand('foreColor', false, e.target.value);
        });

        document.getElementById('note-highlight')?.addEventListener('input', (e) => {
            document.execCommand('hiliteColor', false, e.target.value);
        });

        document.getElementById('note-save')?.addEventListener('click', () => this.saveNote());
        document.getElementById('new-note-btn')?.addEventListener('click', () => this.createNewNote());
        document.getElementById('note-close')?.addEventListener('click', () => this.app.showView('dashboard'));
    }

    createNewNote() {
        this.currentNoteId = null;
        this.editor.innerHTML = '<h2>New Note</h2><p>Start typing...</p>';
        document.querySelectorAll('.note-list-item').forEach(el => el.classList.remove('active'));
    }

    saveNote() {
        const content = this.editor.innerHTML;
        const title = this.editor.querySelector('h1, h2, h3')?.textContent || 'Untitled Note';
        
        const note = {
            id: this.currentNoteId || Date.now(),
            title: title,
            content: content,
            date: new Date().toLocaleDateString()
        };

        if (this.currentNoteId) {
            const index = this.app.state.notes.findIndex(n => n.id === this.currentNoteId);
            this.app.state.notes[index] = note;
        } else {
            this.app.state.notes.push(note);
            this.currentNoteId = note.id;
        }

        this.app.saveState();
        this.renderNotesList();
        this.app.showToast('Note saved!', 'success');
    }

    renderNotesList() {
        const list = document.getElementById('notes-list');
        if (!list) return;

        if (this.app.state.notes.length === 0) {
            list.innerHTML = '<p class="empty-state">No notes saved yet.</p>';
            return;
        }

        list.innerHTML = this.app.state.notes.map(note => `
            <div class="note-list-item ${this.currentNoteId === note.id ? 'active' : ''}" data-id="${note.id}">
                <div class="note-title">${note.title}</div>
                <div class="note-date">${note.date}</div>
            </div>
        `).join('');

        list.querySelectorAll('.note-list-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                this.loadNote(id);
            });
        });
    }

    loadNote(id) {
        const note = this.app.state.notes.find(n => n.id === id);
        if (note) {
            this.currentNoteId = id;
            this.editor.innerHTML = note.content;
            this.renderNotesList();
        }
    }
}

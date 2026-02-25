// ============================================================
// TEXT TO SPEECH ENGINE
// ============================================================

class TTSEngine {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.currentUtterance = null;
        this.isPaused = false;

        if (this.synth) {
            this.init();
        }
    }

    init() {
        // Load voices
        const loadVoices = () => {
            this.voices = this.synth.getVoices();
            this.updateVoiceSelect();
        };

        loadVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }

    updateVoiceSelect() {
        const select = document.getElementById('teacher-voice-select');
        if (!select) return;

        select.innerHTML = this.voices
            .map((voice, index) => `<option value="${index}">${voice.name} (${voice.lang})</option>`)
            .join('');
    }

    speak(text) {
        if (!this.synth) return;

        this.stop();

        const utterance = new SpeechSynthesisUtterance(text);
        const select = document.getElementById('teacher-voice-select');
        const speed = document.getElementById('teacher-speed');

        if (select && this.voices[select.value]) {
            utterance.voice = this.voices[select.value];
        }

        if (speed) {
            utterance.rate = parseFloat(speed.value);
        }

        utterance.onstart = () => {
            document.getElementById('teacher-speak-btn')?.classList.add('hidden');
            document.getElementById('teacher-pause-btn')?.classList.remove('hidden');
            window.cartoonTeacher?.startSpeaking();
        };

        utterance.onend = () => {
            document.getElementById('teacher-speak-btn')?.classList.remove('hidden');
            document.getElementById('teacher-pause-btn')?.classList.add('hidden');
            window.cartoonTeacher?.stopSpeaking();
        };

        this.currentUtterance = utterance;
        this.synth.speak(utterance);
    }

    pause() {
        if (this.synth.speaking && !this.isPaused) {
            this.synth.pause();
            this.isPaused = true;
            document.getElementById('teacher-pause-btn').innerHTML = '<i class="fas fa-play"></i> Resume';
            window.cartoonTeacher?.stopSpeaking();
        } else if (this.isPaused) {
            this.synth.resume();
            this.isPaused = false;
            document.getElementById('teacher-pause-btn').innerHTML = '<i class="fas fa-pause"></i> Pause';
            window.cartoonTeacher?.startSpeaking();
        }
    }

    stop() {
        this.synth.cancel();
        this.isPaused = false;
        document.getElementById('teacher-pause-btn')?.classList.add('hidden');
        document.getElementById('teacher-speak-btn')?.classList.remove('hidden');
        window.cartoonTeacher?.stopSpeaking();
    }
}

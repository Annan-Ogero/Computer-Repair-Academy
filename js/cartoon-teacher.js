// ============================================================
// CARTOON TEACHER RENDERER
// ============================================================

class CartoonTeacher {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.canvas = document.createElement('canvas');
        this.canvas.className = 'character-canvas';
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.isSpeaking = false;
        this.mouthOpen = 0;
        this.eyeBlink = 0;
        this.frame = 0;

        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    startSpeaking() {
        this.isSpeaking = true;
    }

    stopSpeaking() {
        this.isSpeaking = false;
        this.mouthOpen = 0;
    }

    animate() {
        this.frame++;
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    draw() {
        const { ctx, canvas } = this;
        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;

        ctx.clearRect(0, 0, w, h);

        // Body
        ctx.fillStyle = '#6c63ff';
        ctx.beginPath();
        ctx.ellipse(cx, cy + 50, 60, 80, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.fillStyle = '#ffccaa';
        ctx.beginPath();
        ctx.arc(cx, cy - 20, 50, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#333';
        const blink = Math.sin(this.frame * 0.05) > 0.98;
        if (!blink) {
            ctx.beginPath();
            ctx.arc(cx - 15, cy - 30, 5, 0, Math.PI * 2);
            ctx.arc(cx + 15, cy - 30, 5, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx - 20, cy - 30);
            ctx.lineTo(cx - 10, cy - 30);
            ctx.moveTo(cx + 10, cy - 30);
            ctx.lineTo(cx + 20, cy - 30);
            ctx.stroke();
        }

        // Mouth
        ctx.fillStyle = '#333';
        if (this.isSpeaking) {
            this.mouthOpen = Math.abs(Math.sin(this.frame * 0.2)) * 10;
        } else {
            this.mouthOpen = 2;
        }
        ctx.beginPath();
        ctx.ellipse(cx, cy - 5, 10, this.mouthOpen, 0, 0, Math.PI * 2);
        ctx.fill();

        // Glasses
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx - 15, cy - 30, 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + 15, cy - 30, 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 3, cy - 30);
        ctx.lineTo(cx + 3, cy - 30);
        ctx.stroke();
    }
}

/**
 * Matrix Background Animation
 * Renders a subtle falling code effect on a canvas.
 */

class MatrixBackground {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.characters = '01ABCD<>/\\{}[]#$%&@'.split('');
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.active = true;

        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.init());
        document.addEventListener('visibilitychange', () => {
            this.active = !document.hidden;
        });
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100; // Start at different heights
        }
    }

    draw() {
        // Semi-transparent background to create trail effect
        this.ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00aaff'; // Primary accent color
        this.ctx.font = `${this.fontSize}px monospace`;
        this.ctx.globalAlpha = 0.4; // Keep it subtle

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            
            // Randomly use bright cyan for some characters
            if (Math.random() > 0.95) {
                this.ctx.fillStyle = '#00d9ff';
            } else {
                this.ctx.fillStyle = '#00aaff';
            }

            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            // Reset drop to top randomly after it hits bottom
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }
    }

    animate() {
        if (this.active) {
            this.draw();
        }
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MatrixBackground();
});

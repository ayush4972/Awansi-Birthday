const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
let width, height;

// Resize canvas to full screen
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Fireworks Logic
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        // Random velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = 0.015 + Math.random() * 0.01;
        this.gravity = 0.05;
    }

    update() {
        this.vx *= 0.98; // Air resistance
        this.vy *= 0.98;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class Firework {
    constructor() {
        this.x = Math.random() * width;
        this.y = height;
        this.targetY = Math.random() * (height * 0.4); // Explode in top 40%
        this.speed = Math.random() * 3 + 4;
        this.angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.2; // Slight spread
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.hue = Math.floor(Math.random() * 360);
        this.particles = [];
        this.exploded = false;
        this.done = false;
    }

    update() {
        if (!this.exploded) {
            this.x += this.vx;
            this.y += this.vy;
            // Add gravity to launch
            this.vy += 0.02;

            if (this.vy >= 0 || this.y <= this.targetY) {
                this.explode();
            }
        } else {
            for (let i = this.particles.length - 1; i >= 0; i--) {
                this.particles[i].update();
                if (this.particles[i].alpha <= 0) {
                    this.particles.splice(i, 1);
                }
            }
            if (this.particles.length === 0) {
                this.done = true;
            }
        }
    }

    explode() {
        this.exploded = true;
        const colors = ['#ffcc00', '#ff0000', '#cc00ff', '#0099ff', '#ffffff']; // Gold, Red, Purple, Blue, White
        const color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 50; i++) {
            this.particles.push(new Particle(this.x, this.y, color));
        }
    }

    draw(ctx) {
        if (!this.exploded) {
            ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
        } else {
            this.particles.forEach(p => p.draw(ctx));
        }
    }
}

let fireworks = [];

function loop() {
    // Semi-transparent clear for trails
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, width, height);

    if (Math.random() < 0.05) { // 5% chance per frame to launch new firework
        fireworks.push(new Firework());
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw(ctx);
        if (fireworks[i].done) {
            fireworks.splice(i, 1);
        }
    }

    requestAnimationFrame(loop);
}

loop();

// Content Animation
const mainTitle = document.getElementById('main-title');
const messageContainer = document.getElementById('message-container');

// Messages List
const messages = [
    "Sorry for being rude sometimes",
    "Sorry for overreacting",
    "Sorry for taking you for granted",
    "Sorry for not expressing properly",
    "Sorry for misunderstanding",
    "And I love you the most ❤️"
];

// Start Sequence
setTimeout(() => {
    mainTitle.classList.add('visible');
    
    // Start messages after title appears (wait 3 seconds after title starts)
    setTimeout(startMessages, 3000);
}, 2000); // 2 second initial delay

function startMessages() {
    let index = 0;

    function showNextMessage() {
        if (index >= messages.length) return; // Stop after last message? Or loop? User implies sequence.

        // Create new card
        const card = document.createElement('div');
        card.classList.add('message-card');
        card.textContent = messages[index];
        messageContainer.appendChild(card);

        // Force reflow
        void card.offsetWidth;

        // Show card
        card.classList.add('active');

        // Wait, then hide and show next
        // Last message should probably stay?
        // "Stay visible for a few seconds Then smoothly transition to the next"
        // Let's make the last one stay.
        
        let duration = 3000;
        if (index === messages.length - 1) {
            // It's the last one
            return; 
        }

        setTimeout(() => {
            card.classList.remove('active');
            card.classList.add('exit');
            
            // Remove from DOM after transition
            setTimeout(() => {
                card.remove();
                index++;
                showNextMessage();
            }, 1000); // Wait for exit transition
        }, duration);
    }

    showNextMessage();
}

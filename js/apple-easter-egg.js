/**
 * Apple Vision Pro Easter Egg - Particle Animation System
 * Creates a magical particle effect when clicking the Apple icon
 */

class AppleVisionProEasterEgg {
    constructor() {
        this.particleContainer = null;
        this.isAnimating = false;
        this.animationId = null;
        this.particles = [];

        // Configuration
        this.config = {
            particleCount: 25,
            duration: 3500,
            maxDistance: 300,
            particleSizes: ['small', 'medium', 'large'],
            sizeWeights: [0.5, 0.3, 0.2] // Probability weights for each size
        };

        this.init();
    }

    /**
     * Initialize the easter egg functionality
     */
    init() {
        this.createParticleContainer();
        this.bindEvents();
    }

    /**
     * Create the main container for particles
     */
    createParticleContainer() {
        this.particleContainer = document.createElement('div');
        this.particleContainer.className = 'apple-easter-egg-container';
        document.body.appendChild(this.particleContainer);
    }

    /**
     * Bind click event to Apple icon
     */
    bindEvents() {
        const appleIcon = document.getElementById('apple-easter-egg');
        if (appleIcon) {
            appleIcon.addEventListener('click', (e) => {
                e.preventDefault();
                this.triggerEasterEgg(e);
            });
        }
    }

    /**
     * Main method to trigger the easter egg animation
     */
    triggerEasterEgg(event) {
        if (this.isAnimating) return;

        this.isAnimating = true;

        // Add clicked class for icon glow effect
        const appleIcon = event.currentTarget;
        appleIcon.classList.add('clicked');

        // Get click position relative to viewport
        const rect = appleIcon.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;

        // Clear any existing particles
        this.clearParticles();

        // Generate particles
        this.generateParticles(originX, originY);

        // Remove clicked class after glow animation
        setTimeout(() => {
            appleIcon.classList.remove('clicked');
        }, 600);

        // Clean up after animation completes
        setTimeout(() => {
            this.cleanup();
        }, this.config.duration);
    }

    /**
     * Generate particles with random properties
     */
    generateParticles(originX, originY) {
        for (let i = 0; i < this.config.particleCount; i++) {
            const particle = this.createParticle(originX, originY);
            this.particles.push(particle);
            this.particleContainer.appendChild(particle);
        }
    }

    /**
     * Create a single particle with random properties
     */
    createParticle(originX, originY) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size based on weights
        const size = this.getRandomSize();
        particle.classList.add(size);

        // Random angle and distance
        const angle = Math.random() * 360;
        const distance = this.config.maxDistance * (0.3 + Math.random() * 0.7);

        // Calculate trajectory points for smooth animation
        const trajectory = this.calculateTrajectory(angle, distance);

        // Random duration variation for organic feel
        const duration = this.config.duration + (Math.random() - 0.5) * 1000;

        // Set initial position
        particle.style.left = `${originX}px`;
        particle.style.top = `${originY}px`;

        // Set CSS custom properties for animation
        particle.style.setProperty('--duration', `${duration}ms`);
        particle.style.setProperty('--move-x-10', `${trajectory.x10}px`);
        particle.style.setProperty('--move-y-10', `${trajectory.y10}px`);
        particle.style.setProperty('--move-x-30', `${trajectory.x30}px`);
        particle.style.setProperty('--move-y-30', `${trajectory.y30}px`);
        particle.style.setProperty('--move-x-60', `${trajectory.x60}px`);
        particle.style.setProperty('--move-y-60', `${trajectory.y60}px`);
        particle.style.setProperty('--move-x-80', `${trajectory.x80}px`);
        particle.style.setProperty('--move-y-80', `${trajectory.y80}px`);
        particle.style.setProperty('--move-x-100', `${trajectory.x100}px`);
        particle.style.setProperty('--move-y-100', `${trajectory.y100}px`);

        return particle;
    }

    /**
     * Calculate smooth trajectory points for particle movement
     */
    calculateTrajectory(angle, maxDistance) {
        const radian = (angle * Math.PI) / 180;

        // Add some randomness to the trajectory for organic movement
        const wobble = (Math.random() - 0.5) * 0.3;

        return {
            x10: Math.cos(radian + wobble * 0.1) * maxDistance * 0.1,
            y10: Math.sin(radian + wobble * 0.1) * maxDistance * 0.1,
            x30: Math.cos(radian + wobble * 0.3) * maxDistance * 0.4,
            y30: Math.sin(radian + wobble * 0.3) * maxDistance * 0.4,
            x60: Math.cos(radian + wobble * 0.6) * maxDistance * 0.8,
            y60: Math.sin(radian + wobble * 0.6) * maxDistance * 0.8,
            x80: Math.cos(radian + wobble * 0.8) * maxDistance * 0.95,
            y80: Math.sin(radian + wobble * 0.8) * maxDistance * 0.95,
            x100: Math.cos(radian + wobble) * maxDistance,
            y100: Math.sin(radian + wobble) * maxDistance
        };
    }

    /**
     * Get random particle size based on weights
     */
    getRandomSize() {
        const random = Math.random();
        let cumulative = 0;

        for (let i = 0; i < this.config.sizeWeights.length; i++) {
            cumulative += this.config.sizeWeights[i];
            if (random <= cumulative) {
                return this.config.particleSizes[i];
            }
        }

        return this.config.particleSizes[0]; // Fallback
    }

    /**
     * Clear all existing particles
     */
    clearParticles() {
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        this.particles = [];
    }

    /**
     * Clean up after animation
     */
    cleanup() {
        this.clearParticles();
        this.isAnimating = false;
    }

    /**
     * Destroy the easter egg (cleanup method)
     */
    destroy() {
        this.cleanup();
        if (this.particleContainer && this.particleContainer.parentNode) {
            this.particleContainer.parentNode.removeChild(this.particleContainer);
        }
    }
}

// Initialize the easter egg when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're in the right environment
    if (document.getElementById('apple-easter-egg')) {
        new AppleVisionProEasterEgg();
    }
});

// Handle page visibility changes to prevent animations running in background
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.appleEasterEgg) {
        window.appleEasterEgg.cleanup();
    }
});
import { initCursorTrail } from './animations/cursor-trail.js';
import { initGlowingCursor } from './animations/glowing-cursor.js';
import { initLaserBeam } from './animations/laser-beam.js';
import { initPixelDistortion } from './animations/pixel-distortion.js';
import { initFireworks } from './animations/fireworks.js';
import { initParticleNetwork } from './animations/particle-network.js';
import { initMoonOrbit } from './animations/moon-orbit.js';

document.addEventListener('DOMContentLoaded', () => {
    async function downloadAnimationCode(animationType) {
        try {
            const response = await fetch(`/animations/${animationType}.js`);
            const code = await response.text();
            
            const blob = new Blob([code], { type: 'text/javascript' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${animationType}.js`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading animation code:', error);
        }
    }

    // Add download buttons to each animation box
    document.querySelectorAll('.animation-box').forEach(box => {
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'download-btn';
        const icon = document.createElement('i');
        icon.className = 'fas fa-download';
        downloadBtn.appendChild(icon);
        downloadBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering animation box click events
            downloadAnimationCode(box.id);
        });
        box.appendChild(downloadBtn);
    });

    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded. Please check your script inclusion.');
        return;
    }

    // Initialize all animation areas with null checks
    const initializeAnimations = () => {
        // Initialize cursor trail animation
        const cursorTrailArea = document.querySelector('#cursor-trail .animation-area');
        if (cursorTrailArea) {
            initCursorTrail(cursorTrailArea);
        }

        // Initialize glowing cursor animation
        const glowingCursorArea = document.querySelector('#glowing-cursor .animation-area');
        if (glowingCursorArea) {
            initGlowingCursor(glowingCursorArea);
        }

        // Initialize laser beam animation
        const laserBeamArea = document.querySelector('#laser-beam .animation-area');
        if (laserBeamArea) {
            initLaserBeam(laserBeamArea);
        }

        // Initialize pixel distortion animation
        const pixelDistortionArea = document.querySelector('#pixel-distortion .animation-area');
        if (pixelDistortionArea) {
            initPixelDistortion(pixelDistortionArea);
        }

        // Initialize fireworks animation
        const fireworksArea = document.querySelector('#fireworks .animation-area');
        if (fireworksArea) {
            initFireworks(fireworksArea);
        }

        // Initialize particle network animation
        const particleNetworkArea = document.querySelector('#particle-network .animation-area');
        if (particleNetworkArea) {
            initParticleNetwork(particleNetworkArea);
        }

        // Initialize moon orbit animation
        const moonArea = document.querySelector('#moon-orbit .animation-area');
        if (moonArea) {
            initMoonOrbit(moonArea);
        }
    };

    // Initialize animations
    initializeAnimations();
});
import { initFireworksHover } from './animations/hover/fireworks.js';
import { initCursorTrailHover } from './animations/hover/cursor-trail.js';
import { initGlowingCursorHover } from './animations/hover/glowing-cursor.js';
import { initMoonOrbitHover } from './animations/hover/moon-orbit.js';
import { initParticleNetworkHover } from './animations/hover/particle-network.js';
import { initFireworksClick } from './animations/click/fireworks.js';
import { initPixelDistortionClick } from './animations/click/pixel-distortion.js';
import { initLaserBeamClick } from './animations/click/laser-beam.js';

const previewArea = document.querySelector('.preview-area');
let currentHoverAnimation = null;
let currentClickAnimation = null;

// Form elements
const hoverTypeSelect = document.getElementById('hover-animation-type');
const hoverColorInput = document.getElementById('hover-color');
const hoverSizeInput = document.getElementById('hover-size');
const clickTypeSelect = document.getElementById('click-animation-type');
const clickColorInput = document.getElementById('click-color');
const clickDurationInput = document.getElementById('click-duration');

// Animation initialization functions
const hoverAnimations = {
    'cursor-trail': initCursorTrailHover,
    'fireworks': initFireworksHover,
    'glowing-cursor': initGlowingCursorHover,
    'moon-orbit': initMoonOrbitHover,
    'particle-network': initParticleNetworkHover
};

const clickAnimations = {
    'fireworks': initFireworksClick,
    'pixel-distortion': initPixelDistortionClick,
    'laser-beam': initLaserBeamClick
};

// Update hover animation
function updateHoverAnimation() {
    // Clean up previous animation
    if (currentHoverAnimation && currentHoverAnimation.cleanup) {
        currentHoverAnimation.cleanup();
    }
    // Remove all existing animation elements
    const existingElements = previewArea.querySelectorAll('.animation-element, canvas, div:not(.preview-area)');
    existingElements.forEach(element => {
        if (element !== previewArea) {
            element.remove();
        }
    });

    const type = hoverTypeSelect.value;
    const color = hoverColorInput.value;
    const size = parseInt(hoverSizeInput.value);

    if (hoverAnimations[type]) {
        currentHoverAnimation = hoverAnimations[type](previewArea, {
            color: color,
            size: size
        });
    }
}

function updateClickAnimation() {
    // Clean up previous animation
    if (currentClickAnimation && currentClickAnimation.cleanup) {
        currentClickAnimation.cleanup();
    }
    // Remove all existing animation elements
    const existingElements = previewArea.querySelectorAll('.animation-element, canvas, div:not(.preview-area)');
    existingElements.forEach(element => {
        if (element !== previewArea) {
            element.remove();
        }
    });

    const type = clickTypeSelect.value;
    const color = clickColorInput.value;
    const duration = parseInt(clickDurationInput.value);

    if (clickAnimations[type]) {
        currentClickAnimation = clickAnimations[type](previewArea, {
            color: color,
            duration: duration
        });
    }
}

// Event listeners
hoverTypeSelect.addEventListener('change', updateHoverAnimation);
hoverColorInput.addEventListener('input', updateHoverAnimation);
hoverSizeInput.addEventListener('input', updateHoverAnimation);
clickTypeSelect.addEventListener('change', updateClickAnimation);
clickColorInput.addEventListener('input', updateClickAnimation);
clickDurationInput.addEventListener('input', updateClickAnimation);

// Initialize default animations
updateHoverAnimation();
updateClickAnimation();
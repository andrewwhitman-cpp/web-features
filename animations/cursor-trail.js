export function initCursorTrail(cursorTrailArea) {
    let trail = [];
    cursorTrailArea.addEventListener('mousemove', (e) => {
        const rect = cursorTrailArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const particle = createParticle(x, y, '#4ecdc4');
        cursorTrailArea.appendChild(particle);
        trail.push(particle);
        gsap.to(particle, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                particle.remove();
                trail.shift();
            }
        });
    });

    cursorTrailArea.addEventListener('click', (e) => {
        const rect = cursorTrailArea.getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.border = '2px solid #4ecdc4';
        ripple.style.borderRadius = '50%';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.left = (e.clientX - rect.left - 5) + 'px';
        ripple.style.top = (e.clientY - rect.top - 5) + 'px';
        cursorTrailArea.appendChild(ripple);

        gsap.to(ripple, {
            scale: 15,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => ripple.remove()
        });
    });

    function createParticle(x, y, color) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.left = (x - 2.5) + 'px';
        particle.style.top = (y - 2.5) + 'px';
        return particle;
    }

    return {
        css: `.animation-area {
    width: 100%;
    height: 200px;
    background: #333;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}`
    };
}
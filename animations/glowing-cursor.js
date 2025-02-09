export function initGlowingCursor(glowArea) {
    const glow = document.createElement('div');
    glow.style.position = 'absolute';
    glow.style.width = '40px';
    glow.style.height = '40px';
    glow.style.background = 'radial-gradient(circle, #4ecdc4, transparent)';
    glow.style.borderRadius = '50%';
    glow.style.filter = 'blur(5px)';
    glow.style.margin = '-20px 0 0 -20px';
    glowArea.appendChild(glow);

    glowArea.addEventListener('mousemove', (e) => {
        const rect = glowArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
    });

    glowArea.addEventListener('click', (e) => {
        const rect = glowArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const burst = document.createElement('div');
        burst.style.position = 'absolute';
        burst.style.width = '60px';
        burst.style.height = '60px';
        burst.style.background = 'radial-gradient(circle, #4ecdc4 20%, transparent 70%)';
        burst.style.borderRadius = '50%';
        burst.style.filter = 'blur(5px)';
        burst.style.left = (x - 30) + 'px';
        burst.style.top = (y - 30) + 'px';
        glowArea.appendChild(burst);

        gsap.to(burst, {
            scale: 3,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => burst.remove()
        });
    });

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
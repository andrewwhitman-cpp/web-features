export function initGlowingCursorHover(glowArea) {
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
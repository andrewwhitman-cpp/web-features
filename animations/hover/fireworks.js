export function initFireworksHover(fireworksArea) {
    let lastX = 0;
    let lastY = 0;

    const colors = [
        'hsl(180, 100%, 70%)', // cyan
        'hsl(300, 100%, 70%)', // magenta
        'hsl(330, 100%, 70%)', // pink
        'hsl(210, 100%, 70%)', // blue
        'hsl(120, 100%, 70%)'  // green
    ];

    fireworksArea.addEventListener('mousemove', (e) => {
        const rect = fireworksArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (lastX && lastY) {
            const line = document.createElement('div');
            line.style.position = 'absolute';
            line.style.width = '2px';
            line.style.height = '2px';
            const color = colors[Math.floor(Math.random() * colors.length)];
            line.style.background = color;
            line.style.boxShadow = `0 0 8px ${color}`;
            line.style.left = x + 'px';
            line.style.top = y + 'px';
            fireworksArea.appendChild(line);

            gsap.to(line, {
                opacity: 1,
                duration: 0.2,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.to(line, {
                        opacity: 0,
                        duration: 0.2,
                        delay: 0.5,
                        ease: 'power2.in',
                        onComplete: () => line.remove()
                    });
                }
            });
        }

        lastX = x;
        lastY = y;
    });

    fireworksArea.addEventListener('mouseleave', () => {
        lastX = 0;
        lastY = 0;
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
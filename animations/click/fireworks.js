export function initFireworksClick(fireworksArea) {
    fireworksArea.addEventListener('click', (e) => {
        const rect = fireworksArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const colors = [
            'hsl(180, 100%, 70%)', // cyan
            'hsl(300, 100%, 70%)', // magenta
            'hsl(330, 100%, 70%)', // pink
            'hsl(210, 100%, 70%)', // blue
            'hsl(120, 100%, 70%)'  // green
        ];

        function createMandalaLayer(radius, segments, rotationOffset = 0, layerIndex = 0, totalLayers = 1) {
            const angleStep = (Math.PI * 2) / segments;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const baseDelay = layerIndex * 0.05;
            
            for (let i = 0; i < segments; i++) {
                const angle = i * angleStep + rotationOffset;
                const line = document.createElement('div');
                
                line.style.position = 'absolute';
                line.style.width = '2px';
                line.style.height = '0';
                line.style.background = color;
                line.style.boxShadow = `0 0 8px ${color}`;
                line.style.left = x + 'px';
                line.style.top = y + 'px';
                line.style.transformOrigin = '0 0';
                line.style.transform = `rotate(${angle}rad)`;
                line.style.opacity = 0;
                
                fireworksArea.appendChild(line);
                
                gsap.to(line, {
                    height: radius,
                    opacity: 1,
                    duration: 0.5,
                    delay: baseDelay,
                    ease: 'back.out(1.2)',
                    onComplete: () => {
                        gsap.to(line, {
                            opacity: 0,
                            duration: 0.4,
                            delay: 0.2,
                            ease: 'power2.in',
                            onComplete: () => line.remove()
                        });
                    }
                });
            }
        }

        const layers = 3;
        const baseRadius = 50;
        const baseSegments = 12;

        for (let i = 0; i < layers; i++) {
            const radius = baseRadius * (i + 1);
            const segments = baseSegments * (i + 1);
            const rotationOffset = (i % 2) * (Math.PI / segments);
            createMandalaLayer(radius, segments, rotationOffset, i, layers);
        }
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
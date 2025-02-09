export function initBubblePop(bubbleArea) {
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

    bubbleArea.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) {
            const rect = bubbleArea.getBoundingClientRect();
            const bubble = createParticle(
                e.clientX - rect.left,
                e.clientY - rect.top,
                '#4ecdc4'
            );
            bubbleArea.appendChild(bubble);
            
            gsap.to(bubble, {
                y: '-=100',
                scale: 0,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => bubble.remove()
            });
        }
    });

    bubbleArea.addEventListener('click', (e) => {
        const rect = bubbleArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        for (let i = 0; i < 8; i++) {
            const bubble = createParticle(x, y, '#4ecdc4');
            bubbleArea.appendChild(bubble);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 100;
            
            gsap.to(bubble, {
                x: x + Math.cos(angle) * distance,
                y: y + Math.sin(angle) * distance,
                scale: 0,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => bubble.remove()
            });
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
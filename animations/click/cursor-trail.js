export function initCursorTrailClick(cursorTrailArea) {
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
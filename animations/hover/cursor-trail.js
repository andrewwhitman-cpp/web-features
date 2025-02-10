export function initCursorTrailHover(cursorTrailArea) {
    let trail = [];
    let lastX = null;
    let lastY = null;

    cursorTrailArea.addEventListener('mousemove', (e) => {
        const rect = cursorTrailArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (lastX !== null && lastY !== null) {
            const line = createLine(lastX, lastY, x, y, '#4ecdc4');
            cursorTrailArea.appendChild(line);
            trail.push(line);
            gsap.to(line, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    line.remove();
                    trail.shift();
                }
            });
        }

        lastX = x;
        lastY = y;
    });

    function createLine(x1, y1, x2, y2, color) {
        const line = document.createElement('div');
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1);

        line.style.position = 'absolute';
        line.style.width = length + 'px';
        line.style.height = '2px';
        line.style.backgroundColor = color;
        line.style.left = x1 + 'px';
        line.style.top = y1 + 'px';
        line.style.transformOrigin = '0 50%';
        line.style.transform = `rotate(${angle}rad)`;

        return line;
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
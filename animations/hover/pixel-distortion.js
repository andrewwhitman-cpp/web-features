export function initPixelDistortionHover(pixelArea) {
    const pixels = [];
    const pixelSize = 8;

    for (let x = 0; x < pixelArea.offsetWidth; x += pixelSize) {
        for (let y = 0; y < pixelArea.offsetHeight; y += pixelSize) {
            const pixel = document.createElement('div');
            pixel.style.position = 'absolute';
            pixel.style.width = pixelSize + 'px';
            pixel.style.height = pixelSize + 'px';
            pixel.style.backgroundColor = '#4ecdc4';
            pixel.style.left = x + 'px';
            pixel.style.top = y + 'px';
            pixel.style.opacity = '0.1';
            pixelArea.appendChild(pixel);
            pixels.push(pixel);
        }
    }

    pixelArea.addEventListener('mousemove', (e) => {
        const rect = pixelArea.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        pixels.forEach(pixel => {
            const x = parseFloat(pixel.style.left);
            const y = parseFloat(pixel.style.top);
            const distance = Math.hypot(mouseX - x, mouseY - y);
            const maxDistance = 50;
            
            if (distance < maxDistance) {
                gsap.to(pixel, {
                    opacity: 1 - (distance / maxDistance),
                    scale: 1 + (1 - distance / maxDistance),
                    duration: 0.3
                });
            } else {
                gsap.to(pixel, {
                    opacity: 0.1,
                    scale: 1,
                    duration: 0.3
                });
            }
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
export function initMoonOrbit(moonArea) {
    const moon = document.createElement('div');
    moon.style.position = 'absolute';
    moon.style.width = '20px';
    moon.style.height = '20px';
    moon.style.background = '#e1e1ff';
    moon.style.borderRadius = '50%';
    moon.style.boxShadow = '0 0 20px #8080ff';
    moonArea.appendChild(moon);

    let angle = 0;
    let orbitRadius = 50;
    let moonMouseX = moonArea.offsetWidth / 2;
    let moonMouseY = moonArea.offsetHeight / 2;

    moonArea.addEventListener('mousemove', (e) => {
        const rect = moonArea.getBoundingClientRect();
        moonMouseX = e.clientX - rect.left;
        moonMouseY = e.clientY - rect.top;
    });

    function animateMoon() {
        angle += 0.05;
        const x = moonMouseX + Math.cos(angle) * orbitRadius;
        const y = moonMouseY + Math.sin(angle) * orbitRadius;
        
        moon.style.left = (x - 10) + 'px';
        moon.style.top = (y - 10) + 'px';
        
        requestAnimationFrame(animateMoon);
    }

    animateMoon();

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
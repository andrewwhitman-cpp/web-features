export function initLaserBeamClick(laserArea) {
    const lasers = [];
    
    const handleClick = (e) => {
        const rect = laserArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const colors = ['#00ffff', '#ff00ff', '#00ff99', '#ff3377'];
        
        for (let i = 0; i < 12; i++) {
            const laser = document.createElement('div');
            laser.style.position = 'absolute';
            laser.style.width = '80px';
            laser.style.height = '3px';
            laser.style.background = colors[Math.floor(Math.random() * colors.length)];
            laser.style.boxShadow = '0 0 12px ' + laser.style.background;
            laser.style.left = x + 'px';
            laser.style.top = y + 'px';
            laser.style.transformOrigin = '0 50%';
            
            const angle = (i / 12) * Math.PI * 2;
            laser.style.transform = 'rotate(' + angle + 'rad)';
            laserArea.appendChild(laser);
            lasers.push(laser);
            
            gsap.to(laser, {
                scale: 2,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                onComplete: () => {
                    laser.remove();
                    const index = lasers.indexOf(laser);
                    if (index > -1) {
                        lasers.splice(index, 1);
                    }
                }
            });
        }
    };

    laserArea.addEventListener('click', handleClick);

    return {
        css: `.animation-area {
    width: 100%;
    height: 200px;
    background: #333;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}`,
        cleanup: () => {
            laserArea.removeEventListener('click', handleClick);
            lasers.forEach(laser => laser.remove());
            lasers.length = 0;
        }
    };
}
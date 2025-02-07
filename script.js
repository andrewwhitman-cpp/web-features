document.addEventListener('DOMContentLoaded', () => {
    function downloadAnimationCode(animationType) {
        const codeSnippets = {
            'particle-network': {
                js: `const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
particleArea.appendChild(canvas);

const ctx = canvas.getContext('2d');
const particles = [];
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
    canvas.width = particleArea.offsetWidth;
    canvas.height = particleArea.offsetHeight;
}

function createParticles() {
    particles.length = 0;
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#4ecdc4';
    ctx.strokeStyle = 'rgba(78, 205, 196, 0.5)';

    particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

resizeCanvas();
createParticles();
animate();

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

particleArea.addEventListener('mousemove', (e) => {
    const rect = particleArea.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});`,
                css: `.animation-area {
    width: 100%;
    height: 200px;
    background: #333;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}`
            },
            'cursor-trail': {
                js: `cursorTrailArea.addEventListener('mousemove', (e) => {
    const rect = cursorTrailArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const particle = createParticle(x, y, '#4ecdc4');
    cursorTrailArea.appendChild(particle);
    trail.push(particle);
    gsap.to(particle, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            particle.remove();
            trail.shift();
        }
    });
});`,
                css: `.animation-area {
    width: 100%;
    height: 200px;
    background: #333;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}`
            },
            'glowing-cursor': {
                js: `const glow = document.createElement('div');
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
});`,
                css: `.animation-area {
    width: 100%;
    height: 200px;
    background: #333;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}`
            },
            'bubble-pop': {
                js: `bubbleArea.addEventListener('mousemove', (e) => {
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
});`,
                css: `.animation-area {
    width: 100%;
    height: 200px;
    background: #333;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}`
            },
            'laser-beam': {
                js: `laserArea.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        const rect = laserArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const colors = ['#00ffff', '#ff00ff', '#00ff99', '#ff3377'];
        
        const laser = document.createElement('div');
        laser.style.position = 'absolute';
        laser.style.width = '40px';
        laser.style.height = '2px';
        laser.style.background = colors[Math.floor(Math.random() * colors.length)];
        laser.style.boxShadow = '0 0 8px ' + laser.style.background;
        laser.style.left = x + 'px';
        laser.style.top = y + 'px';
        laser.style.transformOrigin = '0 50%';
        
        const angle = Math.random() * Math.PI * 2;
        laser.style.transform = 'rotate(' + angle + 'rad)';
        laserArea.appendChild(laser);
        
        gsap.to(laser, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => laser.remove()
        });
    }
});`,
                css: `.animation-area {
    width: 100%;
    height: 200px;
    background: #333;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}`
            },
            'pixel-distortion': {
                js: `const pixels = [];
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
});`,
                css: `.animation-area {
    width: 100%;
    height: 200px;
    background: #333;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}`
            },
            'fireworks': {
                js: `fireworksArea.addEventListener('mousemove', (e) => {
    const rect = fireworksArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = '2px';
    line.style.height = '2px';
    line.style.background = '#4ecdc4';
    line.style.boxShadow = '0 0 8px #4ecdc4';
    line.style.left = x + 'px';
    line.style.top = y + 'px';
    fireworksArea.appendChild(line);

    gsap.to(line, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => line.remove()
    });
});`,
                css: `.animation-area {
    width: 100%;
    height: 200px;
    background: #333;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}`
            }
        };

        const snippet = codeSnippets[animationType];
        if (!snippet) return;

        const content = `/* JavaScript */\n${snippet.js}\n\n/* CSS */\n${snippet.css}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${animationType}-animation.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Add download buttons to each animation box
    document.querySelectorAll('.animation-box').forEach(box => {
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'download-btn';
        const icon = document.createElement('i');
        icon.className = 'fas fa-download';
        downloadBtn.appendChild(icon);
        downloadBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering animation box click events
            downloadAnimationCode(box.id);
        });
        box.appendChild(downloadBtn);
    });
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded. Please check your script inclusion.');
        return;
    }

    // Utility function to create particles
    function createParticle(x, y, color) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        return particle;
    }

    // Initialize all animation areas with null checks
    const initializeAnimations = () => {
        // Particle Network
        const particleArea = document.querySelector('#particle-network .animation-area');
        if (particleArea) {
            const canvas = document.createElement('canvas');
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            particleArea.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            const particles = [];
            let mouseX = 0;
            let mouseY = 0;

            function resizeCanvas() {
                canvas.width = particleArea.offsetWidth;
                canvas.height = particleArea.offsetHeight;
            }

            function createParticles() {
                particles.length = 0;
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        size: Math.random() * 2 + 1,
                        speedX: Math.random() * 2 - 1,
                        speedY: Math.random() * 2 - 1
                    });
                }
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#4ecdc4';
                ctx.strokeStyle = 'rgba(78, 205, 196, 0.5)';

                particles.forEach(particle => {
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;

                    if (particle.x > canvas.width) particle.x = 0;
                    if (particle.x < 0) particle.x = canvas.width;
                    if (particle.y > canvas.height) particle.y = 0;
                    if (particle.y < 0) particle.y = canvas.height;

                    const dx = mouseX - particle.x;
                    const dy = mouseY - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(mouseX, mouseY);
                        ctx.stroke();
                    }

                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                });

                requestAnimationFrame(animate);
            }

            resizeCanvas();
            createParticles();
            animate();

            window.addEventListener('resize', () => {
                resizeCanvas();
                createParticles();
            });

            particleArea.addEventListener('mousemove', (e) => {
                const rect = particleArea.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
            });

            // Click Animation
            particleArea.addEventListener('click', (e) => {
                const rect = particleArea.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                for (let i = 0; i < 20; i++) {
                    const particle = createParticle(x, y, '#4ecdc4');
                    particleArea.appendChild(particle);

                    gsap.to(particle, {
                        x: (Math.random() - 0.5) * 200,
                        y: (Math.random() - 0.5) * 200,
                        opacity: 0,
                        duration: 1,
                        ease: 'power2.out',
                        onComplete: () => particle.remove()
                    });
                }
            });
        }
        // 1. Cursor Trail
        const cursorTrailArea = document.querySelector('#cursor-trail .animation-area');
        if (cursorTrailArea) {
            let trail = [];
            cursorTrailArea.addEventListener('mousemove', (e) => {
                const rect = cursorTrailArea.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const particle = createParticle(x, y, '#4ecdc4');
                cursorTrailArea.appendChild(particle);
                trail.push(particle);
                gsap.to(particle, {
                    opacity: 0,
                    duration: 1,
                    onComplete: () => {
                        particle.remove();
                        trail.shift();
                    }
                });
            });

            // Click Animation: Ripple Effect
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
        }

        // 2. Glowing Cursor
        const glowArea = document.querySelector('#glowing-cursor .animation-area');
        if (glowArea) {
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

            // Click Animation: Particle Explosion
            glowArea.addEventListener('click', (e) => {
                const rect = glowArea.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                for (let i = 0; i < 20; i++) {
                    const particle = createParticle(x, y, '#4ecdc4');
                    glowArea.appendChild(particle);

                    gsap.to(particle, {
                        x: (Math.random() - 0.5) * 200,
                        y: (Math.random() - 0.5) * 200,
                        opacity: 0,
                        duration: 1,
                        ease: 'power2.out',
                        onComplete: () => particle.remove()
                    });
                }
            });
        }

        // 3. Bubble Pop
        const bubbleArea = document.querySelector('#bubble-pop .animation-area');
        if (bubbleArea) {
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

            // Click Animation: Color Burst
            // Click Animation: Bubble Pop
            bubbleArea.addEventListener('click', (e) => {
                const rect = bubbleArea.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const colors = ['#4ecdc4', '#ff6b6b', '#ffe66d', '#7bc950'];

                // Create initial bubble
                const mainBubble = document.createElement('div');
                mainBubble.style.position = 'absolute';
                mainBubble.style.width = '20px';
                mainBubble.style.height = '20px';
                mainBubble.style.background = 'radial-gradient(circle, rgba(78,205,196,0.8), rgba(78,205,196,0.2))';
                mainBubble.style.borderRadius = '50%';
                mainBubble.style.left = (x - 10) + 'px';
                mainBubble.style.top = (y - 10) + 'px';
                bubbleArea.appendChild(mainBubble);

                // Animate bubble expansion and pop
                gsap.to(mainBubble, {
                    scale: 2,
                    duration: 0.2,
                    ease: 'power1.out',
                    onComplete: () => {
                        mainBubble.remove();
                        
                        // Create burst particles
                        for (let i = 0; i < 12; i++) {
                            const particle = document.createElement('div');
                            particle.style.position = 'absolute';
                            particle.style.width = '6px';
                            particle.style.height = '6px';
                            particle.style.background = `radial-gradient(circle, ${colors[i % colors.length]}cc, ${colors[i % colors.length]}44)`;
                            particle.style.borderRadius = '50%';
                            particle.style.left = x + 'px';
                            particle.style.top = y + 'px';
                            bubbleArea.appendChild(particle);

                            const angle = (i / 12) * Math.PI * 2;
                            const distance = 40 + Math.random() * 20;

                            gsap.to(particle, {
                                x: Math.cos(angle) * distance,
                                y: Math.sin(angle) * distance,
                                scale: 0,
                                opacity: 0,
                                duration: 0.6,
                                ease: 'power2.out',
                                onComplete: () => particle.remove()
                            });
                        }
                    }
                });
            });
        }

        // 4. Laser Beam
        const laserArea = document.querySelector('#laser-beam .animation-area');
        if (laserArea) {
            laserArea.addEventListener('mousemove', (e) => {
                if (Math.random() > 0.9) { // Only create lasers 10% of the time
                    const rect = laserArea.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Create multiple laser beams with random angles
                    const colors = ['#00ffff', '#ff00ff', '#00ff99', '#ff3377'];
                    const numBeams = 1; // 1 beam
                    
                    for (let i = 0; i < numBeams; i++) {
                        const laser = document.createElement('div');
                        laser.style.position = 'absolute';
                        laser.style.width = '40px';
                        laser.style.height = '2px';
                        laser.style.background = colors[Math.floor(Math.random() * colors.length)];
                        laser.style.boxShadow = `0 0 8px ${laser.style.background}`;
                        laser.style.left = x + 'px';
                        laser.style.top = y + 'px';
                        laser.style.transformOrigin = '0 50%';
                        
                        const angle = Math.random() * Math.PI * 2; // Random angle between 0 and 2π
                        const speed = 300 + Math.random() * 200;
                        const distance = Math.max(
                            rect.width - x,
                            rect.height - y,
                            x,
                            y
                        ) * 1.5;
                        
                        laser.style.transform = `rotate(${angle}rad)`;
                        laserArea.appendChild(laser);
                        
                        gsap.to(laser, {
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance,
                            opacity: 0,
                            duration: distance / speed,
                            ease: 'none',
                            onComplete: () => laser.remove()
                        });
                    }
                }
            });

            // Click Animation: Random Reflecting Laser Beams
            laserArea.addEventListener('click', (e) => {
                const rect = laserArea.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const colors = ['#00ffff', '#ff00ff', '#00ff99', '#ff3377'];
                const totalBeams = 5; // Increased number of beams

                function createReflectingBeam(startX, startY, angle, color, reflectionsLeft, speed) {
                    if (reflectionsLeft <= 0) return;

                    const beam = document.createElement('div');
                    beam.style.position = 'absolute';
                    beam.style.width = '0';
                    beam.style.height = '4px';
                    beam.style.background = `linear-gradient(90deg, ${color}, ${color}88)`;
                    beam.style.boxShadow = `0 0 12px ${color}`;
                    beam.style.left = startX + 'px';
                    beam.style.top = startY + 'px';
                    beam.style.transformOrigin = '0 50%';
                    beam.style.transform = `rotate(${angle}rad)`;
                    laserArea.appendChild(beam);

                    // Calculate intersection with walls
                    const dx = Math.cos(angle);
                    const dy = Math.sin(angle);
                    let t = Infinity;
                    let nextAngle = angle;
                    let nextX = startX;
                    let nextY = startY;

                    // Check intersection with right wall
                    if (dx > 0) {
                        const tx = (rect.width - startX) / dx;
                        if (tx < t) {
                            t = tx;
                            nextAngle = Math.PI - angle;
                            nextX = rect.width;
                            nextY = startY + dy * tx;
                        }
                    }
                    // Check intersection with left wall
                    if (dx < 0) {
                        const tx = -startX / dx;
                        if (tx < t) {
                            t = tx;
                            nextAngle = Math.PI - angle;
                            nextX = 0;
                            nextY = startY + dy * tx;
                        }
                    }
                    // Check intersection with bottom wall
                    if (dy > 0) {
                        const ty = (rect.height - startY) / dy;
                        if (ty < t) {
                            t = ty;
                            nextAngle = -angle;
                            nextX = startX + dx * ty;
                            nextY = rect.height;
                        }
                    }
                    // Check intersection with top wall
                    if (dy < 0) {
                        const ty = -startY / dy;
                        if (ty < t) {
                            t = ty;
                            nextAngle = -angle;
                            nextX = startX + dx * ty;
                            nextY = 0;
                        }
                    }

                    const length = Math.min(t, 1000);
                    const duration = length / 500;

                    gsap.to(beam, {
                        width: length,
                        opacity: 1,
                        duration: duration * 0.6,
                        ease: 'expo.out',
                        onComplete: () => {
                            gsap.to(beam, {
                                opacity: 0,
                                duration: duration * 0.4,
                                ease: 'power2.in',
                                onComplete: () => beam.remove()
                            });
                            // Create next reflection
                            createReflectingBeam(nextX, nextY, nextAngle, color, reflectionsLeft - 1);
                        }
                    });
                }

                // Create initial beams
                for (let i = 0; i < totalBeams; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const color = colors[i % colors.length];
                    createReflectingBeam(x, y, angle, color, 3);
                }

                // Create central flash effect
                const flash = document.createElement('div');
                flash.style.position = 'absolute';
                flash.style.width = '20px';
                flash.style.height = '20px';
                flash.style.background = '#fff';
                flash.style.borderRadius = '50%';
                flash.style.left = (x - 10) + 'px';
                flash.style.top = (y - 10) + 'px';
                flash.style.filter = 'blur(5px)';
                laserArea.appendChild(flash);

                gsap.to(flash, {
                    scale: 2,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => flash.remove()
                });
            });
        }

        // 5. Pixel Distortion
        const pixelArea = document.querySelector('#pixel-distortion .animation-area');
        if (pixelArea) {
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

            // Click Animation: Bouncing Shapes
            pixelArea.addEventListener('click', (e) => {
                const rect = pixelArea.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                pixels.forEach(pixel => {
                    const x = parseFloat(pixel.style.left);
                    const y = parseFloat(pixel.style.top);
                    
                    // Calculate angle and distance from click point
                    const dx = x - mouseX;
                    const dy = y - mouseY;
                    const angle = Math.atan2(dy, dx);
                    const distance = Math.hypot(dx, dy);
                    
                    // Store original position
                    const originalX = x;
                    const originalY = y;
                    
                    // Calculate explosion parameters
                    const explosionDistance = Math.min(200, distance * 3);
                    const explosionDuration = 0.5 + Math.random() * 0.3;
                    const returnDelay = explosionDuration + Math.random() * 0.2;
                    const returnDuration = 0.6 + Math.random() * 0.4;
                    
                    // Explosion animation
                    gsap.to(pixel, {
                        x: Math.cos(angle) * explosionDistance,
                        y: Math.sin(angle) * explosionDistance,
                        rotation: Math.random() * 360,
                        scale: 1.5 + Math.random(),
                        opacity: 0.8,
                        duration: explosionDuration,
                        ease: 'power2.out',
                        onComplete: () => {
                            // Return animation
                            gsap.to(pixel, {
                                x: 0,
                                y: 0,
                                rotation: 0,
                                scale: 1,
                                opacity: 0.1,
                                duration: returnDuration,
                                delay: returnDelay - explosionDuration,
                                ease: 'elastic.out(1, 0.5)'
                            });
                        }
                    });
                });
            });
        }

        // 6. Fireworks
        const fireworksArea = document.querySelector('#fireworks .animation-area');
        if (fireworksArea) {
            let lastX = 0;
            let lastY = 0;

            fireworksArea.addEventListener('mousemove', (e) => {
                const rect = fireworksArea.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                if (lastX && lastY) {
                    const line = document.createElement('div');
                    line.style.position = 'absolute';
                    line.style.width = '2px';
                    line.style.height = '2px';
                    line.style.background = '#4ecdc4';
                    line.style.boxShadow = '0 0 8px #4ecdc4';
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

            // Click Animation: Fireworks Mandala Pattern
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
                    const baseDelay = layerIndex * 0.15; // Sequential delay for each layer
                    
                    for (let i = 0; i < segments; i++) {
                        const angle = i * angleStep + rotationOffset;
                        const line = document.createElement('div');
                        
                        line.style.position = 'absolute';
                        line.style.width = '2px';
                        line.style.height = '0'; // Start with 0 height
                        line.style.background = color;
                        line.style.boxShadow = `0 0 8px ${color}`;
                        line.style.left = x + 'px';
                        line.style.top = y + 'px';
                        line.style.transformOrigin = '0 0';
                        line.style.transform = `rotate(${angle}rad)`;
                        line.style.opacity = 0;
                        
                        fireworksArea.appendChild(line);
                        
                        // Animate the line growing from center
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

                // Create multiple layers with different properties
                const totalLayers = 5;
                for (let i = 0; i < totalLayers; i++) {
                    const radius = 20 + (i * 15); // Increased spacing between layers
                    const segments = 8 + (i * 4);
                    const rotationOffset = (i * Math.PI) / totalLayers;
                    createMandalaLayer(radius, segments, rotationOffset, i, totalLayers);
                }

                // Create pulsing circle in the center
                const centerCircle = document.createElement('div');
                centerCircle.style.position = 'absolute';
                centerCircle.style.width = '10px';
                centerCircle.style.height = '10px';
                centerCircle.style.borderRadius = '50%';
                centerCircle.style.background = colors[0];
                centerCircle.style.boxShadow = `0 0 15px ${colors[0]}`;
                centerCircle.style.left = (x - 5) + 'px';
                centerCircle.style.top = (y - 5) + 'px';
                fireworksArea.appendChild(centerCircle);

                gsap.to(centerCircle, {
                    scale: 1.5,
                    opacity: 0,
                    duration: 1,
                    ease: 'power2.inOut',
                    repeat: 0,
                    onComplete: () => centerCircle.remove()
                });
            });
        }
    };

    // Initialize animations
    initializeAnimations();
});
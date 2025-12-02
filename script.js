/*
hi what are you doing here
*/

const cursor = document.getElementById('cursor');

// Center the cursor anchor point
gsap.set(cursor, { xPercent: -50, yPercent: -50 });

const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

window.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
});

// Hover effects
const addHoverListeners = () => {
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
};
addHoverListeners();

const html = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');
const themeText = document.getElementById('theme-text');
const loader = document.getElementById('preloader');
const loaderBar = document.getElementById('loader-bar');
const loaderText = document.getElementById('loader-text');

// cehck local storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    html.classList.add('light');
    themeText.innerText = 'DARK MODE';
} else {
    themeText.innerText = 'LIGHT MODE';
}

toggleBtn.addEventListener('click', () => {
    if (html.classList.contains('light')) {
        html.classList.remove('light');
        localStorage.setItem('theme', 'dark');
        themeText.innerText = 'LIGHT MODE';
    } else {
        html.classList.add('light');
        localStorage.setItem('theme', 'light');
        themeText.innerText = 'DARK MODE';
    }
});

// --- LENIS SETUP ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
});

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// --- PRELOADER ---
// Simulate load
let loadProgress = 0;
const loadInterval = setInterval(() => {
    loadProgress += Math.random() * 5;
    if (loadProgress > 100) loadProgress = 100;

    loaderBar.style.width = `${loadProgress}%`;
    loaderText.innerText = `${Math.floor(loadProgress)}%`;

    if (loadProgress === 100) {
        clearInterval(loadInterval);
        finishLoader();
    }
}, 50);

function finishLoader() {
    const tl = gsap.timeline();

    tl.to(loaderBar, {
        height: '100%',
        duration: 0.5,
        ease: 'power4.inOut'
    })
        .to(loader, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete: () => {
                initAnimations();
            }
        }, "+=0.2");
}

// --- MAIN ANIMATIONS ---
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Text Reveal
    const heroLines = document.querySelectorAll('.hero-line');
    gsap.from(heroLines, {
        y: 150,
        rotate: 5,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2
    });

    // Logo Animation & Tooltip
    const logoLink = document.querySelector('#navbar a');
    const logoCollapse = document.querySelectorAll('.logo-collapse');
    const logoTooltip = document.getElementById('logo-tooltip');

    // Initial state: Expanded
    // ScrollTrigger to collapse logo when leaving hero
    ScrollTrigger.create({
        trigger: 'body',
        start: "top -100", // Collapse after 100px scroll
        onEnter: () => {
            if (!logoLink.matches(':hover')) {
                gsap.to(logoCollapse, { width: 0, opacity: 0, duration: 0.5, ease: "power2.inOut" });
            }
        },
        onLeaveBack: () => {
            gsap.to(logoCollapse, { width: "auto", opacity: 1, duration: 0.5, ease: "power2.inOut" });
        }
    });

    // Hover Effects
    const tooltipX = gsap.quickTo(logoTooltip, "x", { duration: 0.1, ease: "power3" });
    const tooltipY = gsap.quickTo(logoTooltip, "y", { duration: 0.1, ease: "power3" });

    logoLink.addEventListener('mouseenter', () => {
        // Expand logo on hover
        gsap.to(logoCollapse, { width: "auto", opacity: 1, duration: 0.3, ease: "power2.out" });
        // Show tooltip
        gsap.to(logoTooltip, { opacity: 1, scale: 1, duration: 0.2 });
    });

    logoLink.addEventListener('mouseleave', () => {
        // Collapse if scrolled down
        if (window.scrollY > 100) {
            gsap.to(logoCollapse, { width: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
        }
        // Hide tooltip
        gsap.to(logoTooltip, { opacity: 0, scale: 0.9, duration: 0.2 });
    });

    logoLink.addEventListener('mousemove', (e) => {
        tooltipX(e.clientX);
        tooltipY(e.clientY);
    });

    gsap.from('.reveal-text, .reveal-p', {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 1
    });

    gsap.to('.decorative-shape', {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'none'
    });

    // 1.5 Hero Scroll Exit Animation
    const heroSection = document.querySelector('section'); // The first section is the hero
    const heroElements = heroSection.querySelectorAll('p, h1, .flex');

    gsap.to(heroElements, {
        scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: 1
        },
        xPercent: (i) => i % 2 === 0 ? -50 : 50,
        rotation: (i) => i % 2 === 0 ? -15 : 15,
        opacity: 0,
        transformOrigin: (i) => i % 2 === 0 ? "top right" : "top left",
        ease: "power1.in"
    });

    // 2. About Section (Horizontal Typewriter)
    const aboutSection = document.getElementById('about');
    const aboutContainer = document.getElementById('about-container');
    const aboutText = document.getElementById('about-text');

    // Split text into characters
    const textContent = aboutText.innerText;
    aboutText.innerHTML = '';
    const chars = textContent.split('').map(char => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.opacity = 0.2; // Initial dimmed state
        aboutText.appendChild(span);
        return span;
    });

    // Horizontal Scroll & Typewriter Effect
    const scrollWidth = aboutContainer.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: aboutSection,
            start: "top top",
            end: () => `+=${scrollWidth + window.innerWidth}`, // Scroll distance based on content width
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                gsap.to('#about-progress-bar', { width: `${self.progress * 100}%`, duration: 0.1, ease: 'none', overwrite: true });
            }
        }
    });

    // Move container horizontally
    tl.to(aboutContainer, {
        x: () => -scrollWidth,
        ease: "none",
        duration: 1
    });

    // Animate characters (Typewriter / Highlight effect)
    chars.forEach((char, i) => {
        tl.to(char, {
            opacity: 1,
            color: "var(--text-color)", // Fill color
            duration: 0.1,
            ease: "none"
        }, i * (0.9 / chars.length)); // Staggered across the scroll duration
    });

    // 3. Project Cards (Stacking Effect)
    const projectsSection = document.getElementById('projects');
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    const cards = document.querySelectorAll('.project-card');
    const projectsProgress = document.getElementById('projects-progress');

    // Initial positioning not needed with fromTo, but good for FOUC
    gsap.set(cardWrappers, { opacity: 0 });

    // Create a timeline that pins the projects section
    const projectTl = gsap.timeline({
        scrollTrigger: {
            trigger: projectsSection,
            start: "top top",
            end: "+=300%", // Scroll distance depends on card count
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
                // Progress Bar Logic
                gsap.to(projectsProgress, {
                    width: `${self.progress * 100}%`,
                    overwrite: true,
                    ease: 'none'
                });
            }
        }
    });

    // Helper to update stats
    const updateStats = (card, wrapper) => {
        const statsEl = card.querySelector('.card-stats');
        if (!statsEl) return;

        // Get values
        // Wrapper: xPercent, yPercent (Fan layout)
        // Card: x, y (Drag offset)
        const wx = gsap.getProperty(wrapper, "xPercent");
        const wy = gsap.getProperty(wrapper, "yPercent");
        const cx = gsap.getProperty(card, "x");
        const cy = gsap.getProperty(card, "y");
        const z = wrapper.style.zIndex || 0;

        statsEl.innerText = `POS: [${Math.round(wx)}%, ${Math.round(wy)}%] DRAG: [${Math.round(cx)}, ${Math.round(cy)}] Z: ${z}`;
    };

    cardWrappers.forEach((wrapper, index) => {
        // Slide in from sides (fromTo ensures correct direction)
        // Card 1 (Void Terminal, Index 0): Center
        // Card 2 (Ether Sync, Index 1): Left
        // Card 3 (Onyx UI, Index 2): Right

        // Define specific targets for the "fan" layout
        let targetX = 0;
        let targetY = 0;
        let targetRotation = 0;

        if (index === 0) {
            targetX = 0; // Center
            targetRotation = 0;
        } else if (index === 1) {
            targetX = -25; // Left (Reduced from -55)
            targetY = 10;
            targetRotation = -5;
        } else if (index === 2) {
            targetX = 25; // Right (Reduced from 31/55)
            targetY = 10;
            targetRotation = 5;
        }

        // Start from offscreen
        const startX = index % 2 === 0 ? -150 : 150;

        projectTl.fromTo(wrapper, {
            xPercent: startX,
            yPercent: 0,
            opacity: 0,
            rotation: index % 2 === 0 ? -15 : 15
        }, {
            xPercent: targetX,
            yPercent: targetY,
            opacity: 1,
            rotation: targetRotation,
            duration: 1,
            ease: "power2.out",
            onUpdate: () => {
                updateStats(cards[index], wrapper);
            },
            onComplete: () => {
                updateStats(cards[index], wrapper);
            }
        }, index * 0.8); // Overlap timing
    });



    // Draggable & Click Logic
    cards.forEach((card, index) => {
        const wrapper = card.closest('.card-wrapper');

        // Set initial z-index on wrapper
        wrapper.style.zIndex = cards.length - index;

        // Ensure card starts at 0,0 (fix for bounds issue)
        gsap.set(card, { x: 0, y: 0 });

        updateStats(card, wrapper); // Initial update

        // Make draggable
        Draggable.create(card, {
            type: "x,y",
            // bounds: "#cards-wrapper", // Removed to prevent conflict with initial off-screen position
            inertia: true,
            onPress: function () {
                // Bring to front on press
                cardWrappers.forEach((w, i) => {
                });
                wrapper.style.zIndex = 100;
                updateStats(card, wrapper);

                // Pop animation
                gsap.to(this.target, { scale: 1.05, duration: 0.2, ease: "power2.out" });
            },
            onRelease: function () {
                // Animate back to center (0,0) relative to wrapper
                gsap.to(this.target, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out",
                    onUpdate: function () {
                        updateStats(card, wrapper);
                    }
                });
            },
            onDrag: function () {
                updateStats(card, wrapper);
            }
        });
    });

    // Fluid Trail Effect
    const canvas = document.getElementById('fluid-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let isMouseDown = false;
        let lastPos = { x: 0, y: 0 };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor(x, y, dx, dy) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.life = 1;
                this.decay = 0.01 + Math.random() * 0.01; // Slower decay
                this.size = 60 + Math.random() * 40; // Much larger for blur effect
                // Deep Blue / Purple range (220 - 280)
                this.hue = 220 + Math.random() * 60;
            }

            update() {
                this.x += this.dx;
                this.y += this.dy;
                this.life -= this.decay;
                this.size *= 0.96; // Shrink slightly
            }

            draw(ctx) {
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, `hsla(${this.hue}, 80%, 60%, ${this.life * 0.5})`);
                gradient.addColorStop(1, `hsla(${this.hue}, 80%, 60%, 0)`);

                ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
            }
        }

        const addParticles = (x, y, dx, dy) => {
            // Add fewer particles per step but relying on interpolation for density
            for (let i = 0; i < 2; i++) {
                particles.push(new Particle(x, y, dx * 0.5 + (Math.random() - 0.5), dy * 0.5 + (Math.random() - 0.5)));
            }
        };

        window.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            lastPos = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (isMouseDown) {
                const currentX = e.clientX;
                const currentY = e.clientY;

                // Interpolation to fill gaps
                const dist = Math.hypot(currentX - lastPos.x, currentY - lastPos.y);
                const steps = Math.ceil(dist / 5); // Add particle every 5px

                const dx = (currentX - lastPos.x) / steps;
                const dy = (currentY - lastPos.y) / steps;

                for (let i = 0; i < steps; i++) {
                    const x = lastPos.x + dx * i;
                    const y = lastPos.y + dy * i;
                    // Add slight random velocity based on movement
                    addParticles(x, y, dx * 0.1, dy * 0.1);
                }

                lastPos = { x: currentX, y: currentY };
            }
        });

        const animateFluid = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, i) => {
                p.update();
                if (p.life <= 0) {
                    particles.splice(i, 1);
                } else {
                    p.draw(ctx);
                }
            });

            requestAnimationFrame(animateFluid);
        };
        animateFluid();
    }
}

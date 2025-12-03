/*
hi what are you doing here
*/

/*
todo:
- fill in this todo list
- ???
*/

const cursor = document.getElementById('cursor');

// center cursor anchor point
gsap.set(cursor, { xPercent: -50, yPercent: -50 });

const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

window.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
});

// hover effects
const addHoverListeners = () => {
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
};
addHoverListeners();

const html = document.documentElement;
const loader = document.getElementById('preloader');
const loaderBar = document.getElementById('loader-bar');
const loaderText = document.getElementById('loader-text');

// setup lenis stuff
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
});

// then sync lenis with scrolltrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// preloader
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

// animations (dont skid pls)
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // hero text reveal :D
    const heroLines = document.querySelectorAll('.hero-line');
    gsap.from(heroLines, {
        y: 150,
        rotate: 5,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2
    });

    // logo/tooltip anims
    const logoLink = document.querySelector('#navbar a');
    const logoCollapse = document.querySelectorAll('.logo-collapse');
    const logoTooltip = document.getElementById('logo-tooltip');

    // use gsap to collapse logo when leaving hero
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

    // hover effect thing
    const tooltipX = gsap.quickTo(logoTooltip, "x", { duration: 0.1, ease: "power3" });
    const tooltipY = gsap.quickTo(logoTooltip, "y", { duration: 0.1, ease: "power3" });

    logoLink.addEventListener('mouseenter', () => {
        // expand logo when hovered over
        gsap.to(logoCollapse, { width: "auto", opacity: 1, duration: 0.3, ease: "power2.out" });
        // now show tooltip
        gsap.to(logoTooltip, { opacity: 1, scale: 1, duration: 0.2 });
    });

    logoLink.addEventListener('mouseleave', () => {
        // collapse if scrolled down
        if (window.scrollY > 100) {
            gsap.to(logoCollapse, { width: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
        }
        // then hide tooltip
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

    // hero scroll exit animation :o
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

    // about section
    const aboutSection = document.getElementById('about');
    const aboutContainer = document.getElementById('about-container');
    const aboutText = document.getElementById('about-text');

    // split text into characters
    const textContent = aboutText.innerText;
    aboutText.innerHTML = '';
    const chars = textContent.split('').map(char => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.opacity = 0.2;
        aboutText.appendChild(span);
        return span;
    });

    const scrollWidth = aboutContainer.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: aboutSection,
            start: "top top",
            end: () => `+=${scrollWidth + window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                gsap.to('#about-progress-bar', { width: `${self.progress * 100}%`, duration: 0.1, ease: 'none', overwrite: true });
            }
        }
    });

    // move the container horizontally
    tl.to(aboutContainer, {
        x: () => -scrollWidth,
        ease: "none",
        duration: 1
    });

    // animate characters 
    chars.forEach((char, i) => {
        tl.to(char, {
            opacity: 1,
            color: "var(--text-color)",
            duration: 0.1,
            ease: "none"
        }, i * (0.9 / chars.length));
    });

    // -- project cards --
    const projectsSection = document.getElementById('projects');
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    const cards = document.querySelectorAll('.project-card');
    const projectsProgress = document.getElementById('projects-progress');

    // initial positioning isn't needed with fromto, but good for FOUC ig
    gsap.set(cardWrappers, { opacity: 0 });

    // create a timeline that pins the projects section
    const projectTl = gsap.timeline({
        scrollTrigger: {
            trigger: projectsSection,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
                gsap.to(projectsProgress, {
                    width: `${self.progress * 100}%`,
                    overwrite: true,
                    ease: 'none'
                });
            }
        }
    });

    // helper to update stats
    const updateStats = (card, wrapper) => {
        const statsEl = card.querySelector('.card-stats');
        if (!statsEl) return;

        // get values
        const wx = gsap.getProperty(wrapper, "xPercent");
        const wy = gsap.getProperty(wrapper, "yPercent");
        const cx = gsap.getProperty(card, "x");
        const cy = gsap.getProperty(card, "y");
        const z = wrapper.style.zIndex || 0;

        statsEl.innerText = `POS: [${Math.round(wx)}%, ${Math.round(wy)}%] DRAG: [${Math.round(cx)}, ${Math.round(cy)}] Z: ${z}`;
    };

    cardWrappers.forEach((wrapper, index) => {
        let targetX = 0;
        let targetY = 0;
        let targetRotation = 0;

        if (index === 0) {
            targetX = 0;
            targetRotation = 0;
        } else if (index === 1) {
            targetX = -25;
            targetY = 10;
            targetRotation = -5;
        } else if (index === 2) {
            targetX = 25;
            targetY = 10;
            targetRotation = 5;
        }

        // start from offscreen
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
        }, index * 0.8);
    });



    // draggable/click logic (still buggy but i dont wanna fix it)
    cards.forEach((card, index) => {
        const wrapper = card.closest('.card-wrapper');

        // set initial z-index on wrapper
        wrapper.style.zIndex = cards.length - index;

        // ensure card starts at 0,0 (ez fix for bounds issue)
        gsap.set(card, { x: 0, y: 0 });

        updateStats(card, wrapper); // initial update

        // now make it draggable
        Draggable.create(card, {
            type: "x,y",
            // bounds: "#cards-wrapper", // removed to prevent conflict with initial off-screen position
            inertia: true,
            onPress: function () {
                // bring to front on press
                cardWrappers.forEach((w, i) => {
                    w.style.zIndex = cards.length - i;
                });
                wrapper.style.zIndex = 100;
                updateStats(card, wrapper);

                // pop
                gsap.to(this.target, { scale: 1.05, duration: 0.2, ease: "power2.out" });
            },
            onRelease: function () {
                // animate back to center (0,0) relative to wrapper
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

    // fluid trail thing
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
                this.decay = 0.01 + Math.random() * 0.01;
                this.size = 60 + Math.random() * 40;
                this.hue = 220 + Math.random() * 60;
            }

            update() {
                this.x += this.dx;
                this.y += this.dy;
                this.life -= this.decay;
                this.size *= 0.96;
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

                // interpolate or smth (brain died while trying to figure out the math)
                const dist = Math.hypot(currentX - lastPos.x, currentY - lastPos.y);
                const steps = Math.ceil(dist / 5);

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

    // Theme Switch on Scroll
    ScrollTrigger.create({
        trigger: "#projects",
        start: "top bottom", // When top of projects hits bottom of viewport
        onEnter: () => html.classList.add('light'),
        onLeaveBack: () => html.classList.remove('light')
    });
}

// dark mode
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
}

themeToggleBtn.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// --- GSAP Animations ---
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis
const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


// dynamic island animations
ScrollTrigger.create({
    trigger: "#hero",
    start: "bottom top+=100",
    end: "bottom top",
    onLeave: () => {
        const nav = document.querySelector("#navbar");
        const startWidth = getComputedStyle(nav).width;
        nav.style.width = "fit-content";
        const targetWidth = getComputedStyle(nav).width;
        nav.style.width = startWidth;

        gsap.to("#navbar", {
            width: targetWidth,
            borderRadius: "9999px",
            marginTop: "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            backgroundColor: document.documentElement.classList.contains('dark') ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => nav.style.width = "fit-content"
        });
    },
    onEnterBack: () => {
        gsap.to("#navbar", {
            width: "100%",
            borderRadius: "0px",
            marginTop: "0",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            backgroundColor: document.documentElement.classList.contains('dark') ? "rgba(15, 23, 42, 0.7)" : "rgba(255, 255, 255, 0.7)",
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out"
        });
    }
});

// ensure nav background updates if theme changes while in "Island" mode
themeToggleBtn.addEventListener('click', () => {
    if (window.scrollY > window.innerHeight) {
        gsap.to("#navbar", {
            backgroundColor: document.documentElement.classList.contains('dark') ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 0.9)",
            duration: 0.2
        });
    } else {
        gsap.to("#navbar", {
            backgroundColor: document.documentElement.classList.contains('dark') ? "rgba(15, 23, 42, 0.7)" : "rgba(255, 255, 255, 0.7)",
            duration: 0.2
        });
    }
});


// hero animation
const tl = gsap.timeline();
tl.from(".gs-reveal", {
    y: 100,
    opacity: 0,
    duration: 1.4,
    stagger: 0.2,
    ease: "power4.out"
})
    .to(".gs-shape", {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    }, 0)
    .to(".gs-shape-2", {
        y: 40,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    }, 0);

// fade up
gsap.utils.toArray('.gs-fade-up').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 100,
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
});

// fade right
gsap.utils.toArray('.gs-fade-right').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
        },
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
});

// Aggressive Fade Left
gsap.utils.toArray('.gs-fade-left').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
        },
        x: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
});

// card stagger - pop effect
gsap.from(".gs-card", {
    scrollTrigger: {
        trigger: "#gear",
        start: "top 75%",
    },
    y: 120,
    scale: 0.8,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    clearProps: "all", // Clear props after animation to let CSS take over for hover effects
    ease: "back.out(1.2)"
});

// List Stagger
gsap.from(".gs-list-item", {
    scrollTrigger: {
        trigger: "#benefits",
        start: "top 70%",
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out"
});

// Image Reveal
gsap.from(".gs-image-reveal", {
    scrollTrigger: {
        trigger: ".gs-image-reveal",
        start: "top 75%",
    },
    scale: 0.85,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
});

// Zoom In
gsap.utils.toArray('.gs-zoom-in').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%",
        },
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.5)"
    });
});

// Scale Up Story
gsap.from(".gs-scale-up", {
    scrollTrigger: {
        trigger: ".gs-scale-up",
        start: "top 85%",
    },
    scale: 0.8,
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

function copyScript() {
    const scriptText = document.getElementById('loadstring').textContent;
    
    navigator.clipboard.writeText(scriptText).then(() => {
        showToast();
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function animateCounter() {
    const counter = document.getElementById('exec-count');
    const target = Math.floor(Math.random() * 8000) + 17000;
    let current = 0;
    const increment = target / 80;
    const duration = 1500;
    const stepTime = duration / 80;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current).toLocaleString();
        }
    }, stepTime);
}

const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    
    cursorGlow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;
    requestAnimationFrame(animateGlow);
}

window.addEventListener('load', () => {
    animateCounter();
    animateGlow();
});

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
    }, 3000);
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
    const target = Math.floor(Math.random() * 10000) + 15000;
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target.toLocaleString() + '+';
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current).toLocaleString() + '+';
        }
    }, stepTime);
}
window.addEventListener('load', () => {
    animateCounter();
});
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
    }
});

// copy button thingy
function copyScript() {
    let txt = document.getElementById('loadstring').textContent;
    
    navigator.clipboard.writeText(txt).then(() => {
        showToast();
    }).catch(err => {
        console.error('copy failed lol:', err);
    });
}

function showToast() {
    let toastEl = document.getElementById('toast');
    toastEl.classList.add('show');
    
    setTimeout(() => {
        toastEl.classList.remove('show');
    }, 2500);
}

// smooth scrollling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        let targetEl = document.querySelector(this.getAttribute('href'));
        if (targetEl) {
            targetEl.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// cloudflare worker endpoint thinfg
const apiUrl = 'https://nozomi-counter.andrewwutech.workers.dev/count';

async function loadExecutionCount() {
    let counterEl = document.getElementById('exec-count');
    if (apiUrl === 'YOUR_WORKER_URL_HERE/count') {
        console.warn('api not setup yet, using fake numbers');
        animateCounterTo(Math.floor(Math.random() * 50000) + 150000);
        return;
    }
    
    try {
        let res = await fetch(apiUrl);
        let json = await res.json();
        
        if (json.value !== undefined) {
            animateCounterTo(json.value);
        } else {
            throw new Error('weird api response');
        }
    } catch (err) {
        console.error('counter load failed:', err);
        // just use a fake number if it breaks
        animateCounterTo(Math.floor(Math.random() * 50000) + 150000);
    }
}

// animate counter going up
function animateCounterTo(targetNum) {
    let counter = document.getElementById('exec-count');
    let dur = 2000;
    let steps = 60;
    let inc = targetNum / steps;
    let curr = 0;
    
    let timer = setInterval(() => {
        curr += inc;
        if (curr >= targetNum) {
            counter.textContent = Math.floor(targetNum).toLocaleString();
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(curr).toLocaleString();
        }
    }, dur / steps);
}

// cursor glow effect
let glowEl = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    
    glowEl.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;
    requestAnimationFrame(animateGlow);
}

const themes = {
    "dark mode": {
        bg: [30, 30, 30],
        surface: [44, 44, 46],
        accent: [10, 132, 255],
        text: [255, 255, 255],
        secondaryText: [152, 152, 157],
        border: [58, 58, 60]
    },
    "light mode": {
        bg: [245, 245, 247],
        surface: [255, 255, 255],
        accent: [0, 122, 255],
        text: [28, 28, 30],
        secondaryText: [142, 142, 147],
        border: [209, 209, 214]
    },
    "vs code dark": {
        bg: [30, 30, 30],
        surface: [37, 37, 38],
        accent: [0, 122, 204],
        text: [212, 212, 212],
        secondaryText: [150, 150, 150],
        border: [60, 60, 60]
    },
    "dracula": {
        bg: [40, 42, 54],
        surface: [68, 71, 90],
        accent: [189, 147, 249],
        text: [248, 248, 242],
        secondaryText: [139, 233, 253],
        border: [68, 71, 90]
    },
    "nord": {
        bg: [46, 52, 64],
        surface: [59, 66, 82],
        accent: [136, 192, 208],
        text: [236, 239, 244],
        secondaryText: [216, 222, 233],
        border: [76, 86, 106]
    },
    "monokai": {
        bg: [39, 40, 34],
        surface: [73, 72, 62],
        accent: [249, 38, 114],
        text: [248, 248, 242],
        secondaryText: [117, 113, 94],
        border: [73, 72, 62]
    },
    "monkeytype dark": {
        bg: [50, 52, 55],
        surface: [44, 46, 49],
        accent: [226, 183, 20],
        text: [209, 208, 197],
        secondaryText: [136, 134, 125],
        border: [58, 61, 65]
    },
    "monkeytype light": {
        bg: [246, 245, 244],
        surface: [255, 255, 255],
        accent: [226, 183, 20],
        text: [44, 46, 49],
        secondaryText: [100, 101, 105],
        border: [224, 222, 217]
    },
    "monkeytype 9009": {
        bg: [237, 232, 225],
        surface: [218, 210, 202],
        accent: [180, 139, 125],
        text: [75, 74, 71],
        secondaryText: [130, 127, 122],
        border: [200, 193, 186]
    },
    "sakura light": {
        bg: [245, 240, 230],
        surface: [255, 239, 210],
        accent: [255, 122, 144],
        text: [62, 47, 45],
        secondaryText: [120, 100, 95],
        border: [231, 213, 189]
    },
    "sakura dark": {
        bg: [38, 34, 32],
        surface: [58, 46, 44],
        accent: [255, 122, 144],
        text: [235, 220, 210],
        secondaryText: [180, 160, 150],
        border: [80, 62, 58]
    },
    "soft pastel": {
        bg: [249, 245, 250],
        surface: [255, 250, 255],
        accent: [203, 166, 247],
        text: [88, 76, 95],
        secondaryText: [152, 136, 162],
        border: [232, 220, 238]
    },
    "soft pastel dark": {
        bg: [42, 38, 50],
        surface: [58, 52, 70],
        accent: [203, 166, 247],
        text: [236, 225, 245],
        secondaryText: [186, 175, 195],
        border: [82, 74, 96]
    },
    "soft mint": {
        bg: [244, 250, 248],
        surface: [250, 255, 252],
        accent: [134, 205, 186],
        text: [75, 95, 88],
        secondaryText: [125, 145, 138],
        border: [220, 238, 232]
    },
    "soft mint dark": {
        bg: [34, 48, 44],
        surface: [46, 62, 57],
        accent: [134, 205, 186],
        text: [214, 235, 228],
        secondaryText: [164, 185, 178],
        border: [74, 102, 94]
    },
    "soft lavender": {
        bg: [248, 246, 255],
        surface: [255, 251, 255],
        accent: [186, 157, 255],
        text: [82, 72, 110],
        secondaryText: [132, 122, 160],
        border: [228, 221, 250]
    },
    "soft lavender dark": {
        bg: [43, 38, 59],
        surface: [58, 52, 78],
        accent: [186, 157, 255],
        text: [230, 223, 255],
        secondaryText: [180, 173, 205],
        border: [84, 75, 115]
    },
    "soft blue": {
        bg: [242, 248, 255],
        surface: [250, 254, 255],
        accent: [132, 176, 255],
        text: [68, 92, 128],
        secondaryText: [118, 142, 178],
        border: [212, 225, 245]
    },
    "soft blue dark": {
        bg: [32, 42, 58],
        surface: [44, 56, 74],
        accent: [132, 176, 255],
        text: [217, 230, 255],
        secondaryText: [167, 180, 205],
        border: [64, 76, 94]
    }
};

function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    const root = document.documentElement;
    root.style.setProperty('--bg', `rgb(${theme.bg.join(',')})`);
    root.style.setProperty('--surface', `rgb(${theme.surface.join(',')})`);
    root.style.setProperty('--border', `rgb(${theme.border.join(',')})`);
    root.style.setProperty('--text', `rgb(${theme.text.join(',')})`);
    root.style.setProperty('--text-dim', `rgb(${theme.secondaryText.join(',')})`);
    root.style.setProperty('--accent', `rgb(${theme.accent.join(',')})`);
    const accentHover = theme.accent.map(c => Math.min(255, c + 20));
    root.style.setProperty('--accent-hover', `rgb(${accentHover.join(',')})`);
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        cursorGlow.style.background = `radial-gradient(circle, rgba(${theme.accent.join(',')}, 0.15) 0%, transparent 70%)`;
    }
    const mockup = document.querySelector('.ui-mockup');
    const header = mockup.querySelector('.ui-header');
    const sidebar = mockup.querySelector('.ui-sidebar');
    const content = mockup.querySelector('.ui-content');
    const tabs = mockup.querySelectorAll('.ui-tab');
    
    mockup.style.background = `rgb(${theme.bg.join(',')})`;
    header.style.background = `rgb(${theme.surface.join(',')})`;
    header.style.borderBottomColor = `rgb(${theme.border.join(',')})`;
    sidebar.style.background = `rgb(${theme.surface.join(',')})`;
    content.style.background = `rgb(${theme.bg.join(',')})`;
    
    const titleEl = mockup.querySelector('.ui-title');
    titleEl.style.color = `rgb(${theme.secondaryText.join(',')})`;
    
    const sectionLabels = mockup.querySelectorAll('.section-label');
    sectionLabels.forEach(label => {
        label.style.color = `rgb(${theme.secondaryText.join(',')})`;
    });
    
    const settingLabels = mockup.querySelectorAll('.setting-label');
    settingLabels.forEach(label => {
        label.style.color = `rgb(${theme.text.join(',')})`;
    });
    
    const settingValues = mockup.querySelectorAll('.setting-value');
    settingValues.forEach(value => {
        value.style.color = `rgb(${theme.accent.join(',')})`;
    });
    
    tabs.forEach(tab => {
        tab.style.color = `rgb(${theme.secondaryText.join(',')})`;
    });
}

// 3d tilt effect for ui preview
let previewEl = document.getElementById('ui-preview');
let mockupEl = document.querySelector('.ui-mockup');
let tiltX = 0, tiltY = 0;
let curX = 0, curY = 0;

previewEl.addEventListener('mousemove', (e) => {
    let rect = previewEl.getBoundingClientRect();
    tiltX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    tiltY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
});

previewEl.addEventListener('mouseleave', () => {
    tiltX = 0;
    tiltY = 0;
});

function animate3D() {
    curX += (tiltX - curX) * 0.1;
    curY += (tiltY - curY) * 0.1;
    
    let rotY = curX * 15;
    let rotX = -curY * 10;
    
    mockupEl.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(20px)`;
    
    requestAnimationFrame(animate3D);
}

// theme switcher
let themeDropdown = document.getElementById('theme-selector');
themeDropdown.addEventListener('change', (e) => {
    applyTheme(e.target.value);
});

// sidebar expand on hover
let sidebarEl = document.getElementById('ui-sidebar');
let uiBody = sidebarEl?.parentElement;

if (sidebarEl && uiBody) {
    sidebarEl.addEventListener('mouseenter', () => {
        uiBody.classList.add('expanded');
    });
    
    sidebarEl.addEventListener('mouseleave', () => {
        uiBody.classList.remove('expanded');
    });
}

// init everything when page loads
window.addEventListener('load', () => {
    loadExecutionCount();
    animateGlow();
    animate3D();
    applyTheme('dark mode');
    initIntroObserver();
    initToggles();
    initSliders();
    initDropdowns();
    initKeybind();
    initScrollHeader();
});

// collapse header logo on scroll
function initScrollHeader() {
    let header = document.querySelector('.header');
    let lastY = 0;
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastY = scrollY;
    }, { passive: true });
}

// fade in intro cards when scrolling
function initIntroObserver() {
    let cards = document.querySelectorAll('.intro-card');
    let section = document.querySelector('.intro-section');
    if (!cards.length) return;
    
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add('in-view');
        });
    }, { threshold: 0.15 });
    cards.forEach(el => io.observe(el));
    if (section) {
        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 15;
            const y = (e.clientY - rect.top - rect.height / 2) / 15;
            section.style.setProperty('--intro-shift-x', `${x}px`);
            section.style.setProperty('--intro-shift-y', `${y}px`);
        });
    }
}

// toggle switches
function initToggles() {
    document.querySelectorAll('.ui-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => toggle.classList.toggle('active'));
    });
}
// slider functionality
function initSliders() {
    document.querySelectorAll('.ui-slider').forEach(slider => {
        let minVal = parseFloat(slider.dataset.min ?? '0');
        let maxVal = parseFloat(slider.dataset.max ?? '100');
        let stepSize = parseFloat(slider.dataset.step ?? '1');
        let valLabel = slider.previousElementSibling?.querySelector('.setting-value');
        let val = parseFloat(valLabel?.textContent?.trim() ?? String((minVal+maxVal)/2));
        if (isNaN(val)) val = (minVal + maxVal) / 2;

        let fillEl = slider.querySelector('.slider-fill');
        let thumbEl = slider.querySelector('.slider-thumb');

        let getPercent = (v) => (v - minVal) / (maxVal - minVal);
        let clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
        let decimals = (stepSize.toString().split('.')[1] || '').length;
        let snapToStep = (v) => Math.round(v / stepSize) * stepSize;

        function updateSlider(v, instant = false) {
            let p = clamp(getPercent(v), 0, 1);
            if (instant) {
                fillEl.style.transition = 'none';
                thumbEl.style.transition = 'transform 0.15s, box-shadow 0.15s';
            }
            fillEl.style.width = `${p * 100}%`;
            thumbEl.style.left = `${p * 100}%`;
            if (valLabel) valLabel.textContent = (decimals ? v.toFixed(decimals) : Math.round(v)).toString();
            if (instant) {
                requestAnimationFrame(() => {
                    fillEl.style.transition = '';
                    thumbEl.style.transition = '';
                });
            }
        }

        updateSlider(val);

        function handleDrag(e) {
            let rect = slider.getBoundingClientRect();
            let x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
            val = snapToStep(minVal + x * (maxVal - minVal));
            updateSlider(val, true);
        }

        slider.addEventListener('pointerdown', (e) => {
            slider.classList.add('dragging');
            slider.setPointerCapture(e.pointerId);
            const move = handleDrag;
            const up = (ev) => {
                slider.classList.remove('dragging');
                slider.releasePointerCapture(ev.pointerId);
            };
            window.addEventListener('pointermove', move);
            window.addEventListener('pointerup', up, { once: true });
        });
    });
}

// dropdown menus
let currentMenu = null;
function closeMenu() { if (currentMenu) { currentMenu.remove(); currentMenu = null; } }

function initDropdowns() {
    document.querySelectorAll('.ui-dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
            let menuEl = document.createElement('div');
            menuEl.className = 'dropdown-menu';
            let opts = (dropdown.dataset.options || '').split(',').map(s => s.trim()).filter(Boolean);
            let selected = dropdown.dataset.selected || dropdown.textContent.trim();
            opts.forEach(opt => {
                let itemEl = document.createElement('div');
                itemEl.className = 'dropdown-item';
                itemEl.textContent = opt;
                if (opt === selected) itemEl.style.background = 'rgba(255,255,255,0.08)';
                itemEl.addEventListener('click', () => {
                    dropdown.dataset.selected = opt;
                    dropdown.textContent = `${opt} ▾`;
                    closeMenu();
                });
                menuEl.appendChild(itemEl);
            });
            document.body.appendChild(menuEl);
            requestAnimationFrame(() => {
                positionMenuBelow(dropdown, menuEl);
                menuEl.style.opacity = '0';
                menuEl.style.transform = 'translateY(-8px)';
                menuEl.style.transition = 'opacity 0.15s, transform 0.15s';
                requestAnimationFrame(() => {
                    menuEl.style.opacity = '1';
                    menuEl.style.transform = 'translateY(0)';
                });
            });
            currentMenu = menuEl;
        });
    });

    window.addEventListener('click', closeMenu);
    window.addEventListener('scroll', () => { if (currentMenu) closeMenu(); }, { passive: true });
    window.addEventListener('resize', () => { if (currentMenu) closeMenu(); });
}

function positionMenuBelow(anchor, menu) {
    let rect = anchor.getBoundingClientRect();
    let topPos = rect.bottom + window.scrollY + 6;
    let leftPos = rect.left + window.scrollX;
    let viewportWidth = document.documentElement.clientWidth;
    let menuWidth = menu.offsetWidth || 180;
    if (leftPos + menuWidth + 10 > viewportWidth + window.scrollX) leftPos = viewportWidth + window.scrollX - menuWidth - 10;
    menu.style.top = `${topPos}px`;
    menu.style.left = `${leftPos}px`;
}

// keybind recorder
function initKeybind() {
    let chipEl = document.getElementById('keybind-chip');
    let displayEl = document.getElementById('keybind-display');
    if (!chipEl || !displayEl) return;
    let savedKey = localStorage.getItem('nozomi_ui_keybind');
    if (savedKey) displayEl.textContent = savedKey;
    chipEl.addEventListener('click', () => {
        chipEl.classList.add('listening');
        let keyHandler = (e) => {
            e.preventDefault();
            let key = e.key?.length ? e.key : `Key${e.keyCode}`;
            displayEl.textContent = key;
            localStorage.setItem('nozomi_ui_keybind', key);
            chipEl.classList.remove('listening');
            window.removeEventListener('keydown', keyHandler, true);
        };
        window.addEventListener('keydown', keyHandler, true);
    });
}

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

const EXECUTION_API_URL = 'https://nozomi-counter.andrewwutech.workers.dev/count';

async function loadExecutionCount() {
    const counter = document.getElementById('exec-count');
    if (EXECUTION_API_URL === 'YOUR_WORKER_URL_HERE/count') {
        console.warn('Execution API not configured. See EXECUTION_TRACKING.md to set up Cloudflare Worker.');
        animateCounterTo(Math.floor(Math.random() * 50000) + 150000);
        return;
    }
    
    try {
        const response = await fetch(EXECUTION_API_URL);
        const data = await response.json();
        
        if (data.value !== undefined) {
            animateCounterTo(data.value);
        } else {
            throw new Error('Invalid API response');
        }
    } catch (error) {
        console.error('Failed to load execution count:', error);
        // Fallback to fake counter
        animateCounterTo(Math.floor(Math.random() * 50000) + 150000);
    }
}

function animateCounterTo(target) {
    const counter = document.getElementById('exec-count');
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = Math.floor(target).toLocaleString();
            clearInterval(interval);
        } else {
            counter.textContent = Math.floor(current).toLocaleString();
        }
    }, duration / steps);
}

const cursorGlow = document.querySelector('.cursor-glow');
let cursorMouseX = 0, cursorMouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    cursorMouseX = e.clientX;
    cursorMouseY = e.clientY;
});

function animateGlow() {
    glowX += (cursorMouseX - glowX) * 0.1;
    glowY += (cursorMouseY - glowY) * 0.1;
    
    cursorGlow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;
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

const uiPreview = document.getElementById('ui-preview');
const mockup = document.querySelector('.ui-mockup');
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

uiPreview.addEventListener('mousemove', (e) => {
    const rect = uiPreview.getBoundingClientRect();
    mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
});

uiPreview.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
});

function animate3D() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    
    const rotateY = currentX * 15;
    const rotateX = -currentY * 10;
    
    mockup.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    
    requestAnimationFrame(animate3D);
}

const themeSelector = document.getElementById('theme-selector');
themeSelector.addEventListener('change', (e) => {
    applyTheme(e.target.value);
});
const sidebar = document.getElementById('ui-sidebar');
const uiBody = sidebar?.parentElement;

if (sidebar && uiBody) {
    sidebar.addEventListener('mouseenter', () => {
        uiBody.classList.add('expanded');
    });
    
    sidebar.addEventListener('mouseleave', () => {
        uiBody.classList.remove('expanded');
    });
}

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
});

function initIntroObserver() {
    const cards = document.querySelectorAll('.intro-card');
    const section = document.querySelector('.intro-section');
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

function initToggles() {
    document.querySelectorAll('.ui-toggle').forEach(t => {
        t.addEventListener('click', () => t.classList.toggle('active'));
    });
}
function initSliders() {
    document.querySelectorAll('.ui-slider').forEach(slider => {
        const min = parseFloat(slider.dataset.min ?? '0');
        const max = parseFloat(slider.dataset.max ?? '100');
        const step = parseFloat(slider.dataset.step ?? '1');
        const valueLabel = slider.previousElementSibling?.querySelector('.setting-value');
        let value = parseFloat(valueLabel?.textContent?.trim() ?? String((min+max)/2));
        if (isNaN(value)) value = (min + max) / 2;

        const fill = slider.querySelector('.slider-fill');
        const thumb = slider.querySelector('.slider-thumb');

        const percentFromValue = (v) => (v - min) / (max - min);
        const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
        const decimals = (step.toString().split('.')[1] || '').length;
        const snap = (v) => Math.round(v / step) * step;

        function updateVisuals(v) {
            const p = clamp(percentFromValue(v), 0, 1);
            fill.style.width = `${p * 100}%`;
            thumb.style.left = `${p * 100}%`;
            if (valueLabel) valueLabel.textContent = (decimals ? v.toFixed(decimals) : Math.round(v)).toString();
        }

        updateVisuals(value);

        function onPointerMove(e) {
            const rect = slider.getBoundingClientRect();
            const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
            value = snap(min + x * (max - min));
            updateVisuals(value);
        }

        slider.addEventListener('pointerdown', (e) => {
            slider.classList.add('dragging');
            slider.setPointerCapture(e.pointerId);
            onPointerMove(e);
            const move = onPointerMove;
            const up = (ev) => {
                slider.classList.remove('dragging');
                slider.releasePointerCapture(ev.pointerId);
                window.removeEventListener('pointermove', move);
                window.removeEventListener('pointerup', up);
            };
            window.addEventListener('pointermove', move);
            window.addEventListener('pointerup', up, { once: true });
        });
    });
}

let openMenuEl = null;
function closeOpenMenu() { if (openMenuEl) { openMenuEl.remove(); openMenuEl = null; } }

function initDropdowns() {
    document.querySelectorAll('.ui-dropdown').forEach(dd => {
        dd.addEventListener('click', (e) => {
            e.stopPropagation();
            closeOpenMenu();
            const menu = document.createElement('div');
            menu.className = 'dropdown-menu';
            const options = (dd.dataset.options || '').split(',').map(s => s.trim()).filter(Boolean);
            const sel = dd.dataset.selected || dd.textContent.trim();
            options.forEach(opt => {
                const item = document.createElement('div');
                item.className = 'dropdown-item';
                item.textContent = opt;
                if (opt === sel) item.style.background = 'rgba(255,255,255,0.08)';
                item.addEventListener('click', () => {
                    dd.dataset.selected = opt;
                    dd.textContent = `${opt} ▾`;
                    closeOpenMenu();
                });
                menu.appendChild(item);
            });
            document.body.appendChild(menu);
            positionMenuBelow(dd, menu);
            openMenuEl = menu;
        });
    });

    window.addEventListener('click', closeOpenMenu);
    window.addEventListener('scroll', () => { if (openMenuEl) closeOpenMenu(); }, { passive: true });
    window.addEventListener('resize', () => { if (openMenuEl) closeOpenMenu(); });
}

function positionMenuBelow(anchor, menu) {
    const rect = anchor.getBoundingClientRect();
    const top = rect.bottom + window.scrollY + 6;
    let left = rect.left + window.scrollX;
    const vw = document.documentElement.clientWidth;
    const mw = menu.offsetWidth || 180;
    if (left + mw + 10 > vw + window.scrollX) left = vw + window.scrollX - mw - 10;
    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
}
function initKeybind() {
    const chip = document.getElementById('keybind-chip');
    const display = document.getElementById('keybind-display');
    if (!chip || !display) return;
    const stored = localStorage.getItem('nozomi_ui_keybind');
    if (stored) display.textContent = stored;
    chip.addEventListener('click', () => {
        chip.classList.add('listening');
        const handler = (e) => {
            e.preventDefault();
            const keyName = e.key?.length ? e.key : `Key${e.keyCode}`;
            display.textContent = keyName;
            localStorage.setItem('nozomi_ui_keybind', keyName);
            chip.classList.remove('listening');
            window.removeEventListener('keydown', handler, true);
        };
        window.addEventListener('keydown', handler, true);
    });
}

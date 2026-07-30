const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const progressBar = document.querySelector('.scroll-progress');
const cursorGlow = document.querySelector('.cursor-glow');
const cards = document.querySelectorAll('.project-card, .panel, .contact-card, .metric-card');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }, { passive: true });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const targetSelector = anchor.getAttribute('href');
        if (!targetSelector || targetSelector === '#') {
            return;
        }

        const target = document.querySelector(targetSelector);
        if (!target) {
            return;
        }

        e.preventDefault();
        const navOffset = 84;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
});

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 40, 260)}ms`;
});

requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        revealElements.forEach((el) => observer.observe(el));
    });
});

const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

let scrollTicking = false;
const updateProgress = () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (scrollTop / height) * 100 : 0;
    progressBar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
    scrollTicking = false;
};

updateProgress();
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(updateProgress);
    }
}, { passive: true });

if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let glowRaf = false;
    window.addEventListener('mousemove', (event) => {
        if (glowRaf) return;
        glowRaf = true;
        requestAnimationFrame(() => {
            cursorGlow.style.opacity = '1';
            cursorGlow.style.transform = `translate(${event.clientX - 120}px, ${event.clientY - 120}px)`;
            glowRaf = false;
        });
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
}

if (window.matchMedia('(pointer: fine)').matches) {
    cards.forEach((card) => {
        let cardRaf = false;
        card.addEventListener('mousemove', (event) => {
            if (cardRaf) return;
            cardRaf = true;
            requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const rotateX = ((y / rect.height) - 0.5) * -7;
                const rotateY = ((x / rect.width) - 0.5) * 9;
                card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
                cardRaf = false;
            });
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

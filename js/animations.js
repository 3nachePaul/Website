/**
 * Animations — Premium Scroll Reveal, Page Transitions & Sequential CV Reveals
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initPageTransitions();
    initCVSequentialReveal();
    initTimelineAnimation();
    initSkillTagAnimation();

    // Safety fallback — force all hidden elements visible after 3s
    // (guards against IntersectionObserver or animation glitches on CDN-hosted pages)
    setTimeout(() => {
        document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
            el.classList.add('revealed');
        });
        document.querySelectorAll('.timeline__item:not(.revealed)').forEach(el => {
            el.classList.add('revealed');
        });
        document.querySelectorAll('.skill-item:not(.revealed)').forEach(el => {
            el.classList.add('revealed');
        });
    }, 3000);
});

/* -----------------------------------------------------------------------
   Scroll Reveal — Intersection Observer
   ----------------------------------------------------------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => entry.target.classList.add('revealed'));
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
}

/* -----------------------------------------------------------------------
   CV Page — Sequential reveal on scroll
   Every section/child animates in order as the user scrolls down.
   ----------------------------------------------------------------------- */
function initCVSequentialReveal() {
    // Only run on CV page
    if (!document.querySelector('.cv__header')) return;

    // Collect all revealable elements in document order
    const selectors = [
        '.cv__header',
        '.cv__header h1',
        '.cv__header .divider',
        '.cv__header .text-muted',
        '.cv__social-links',
        '.cv__download',
        '.cv__section',
        '.cv__section-title',
        '.timeline__item',
        '.carousel-3d',
        '.skill-list'
    ];

    const elements = [];
    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            if (!elements.includes(el)) elements.push(el);
        });
    });

    // Sort by vertical position so they reveal top-to-bottom
    elements.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

    // Add the reveal class if not already present
    elements.forEach(el => {
        if (!el.classList.contains('reveal') &&
            !el.classList.contains('timeline__item') &&
            !el.classList.contains('skill-item')) {
            el.classList.add('reveal');
        }
    });

    // Observe each element individually
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => entry.target.classList.add('revealed'));
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

/* -----------------------------------------------------------------------
   Timeline items — staggered reveal animation
   ----------------------------------------------------------------------- */
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline__item');
    if (!timelineItems.length) return;

    // Group items by their parent timeline
    const timelines = new Map();
    timelineItems.forEach(item => {
        const parent = item.closest('.timeline');
        if (!timelines.has(parent)) timelines.set(parent, []);
        timelines.get(parent).push(item);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const parent = entry.target.closest('.timeline');
            const siblings = timelines.get(parent) || [];
            const idx = siblings.indexOf(entry.target);
            // Stagger 180ms per item within its timeline group
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, idx * 180);
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.15 });

    timelineItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
        observer.observe(item);
    });
}

/* -----------------------------------------------------------------------
   Skill tags — staggered pop-in
   ----------------------------------------------------------------------- */
function initSkillTagAnimation() {
    const skillLists = document.querySelectorAll('.skill-list');
    if (!skillLists.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const items = entry.target.querySelectorAll('.skill-item');
            items.forEach((item, i) => {
                setTimeout(() => item.classList.add('revealed'), i * 60);
            });
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -30px 0px', threshold: 0.1 });

    skillLists.forEach(list => observer.observe(list));
}

/* -----------------------------------------------------------------------
   Page Transitions — smooth overlay between pages
   ----------------------------------------------------------------------- */
function initPageTransitions() {
    let overlay = document.querySelector('.page-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'page-overlay';
        document.body.appendChild(overlay);
    }

    // Internal links get a fade-out transition
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"]):not([href^="mailto"]):not([download])');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const current = window.location.pathname.split('/').pop() || 'index.html';
            if (href === current) return;

            e.preventDefault();
            overlay.classList.add('active');
            setTimeout(() => { window.location.href = href; }, 400);
        });
    });

    // Reveal above-fold content immediately on load
    window.addEventListener('load', () => {
        document.body.classList.add('page-loaded');
        // Dismiss any lingering overlay (safety net for GitHub Pages / CDN caching)
        if (overlay) overlay.classList.remove('active');
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
                el.classList.add('revealed');
            }
        });
    });

    // Extra safety: if 'load' never fires (bfcache), clear overlay on pageshow
    window.addEventListener('pageshow', () => {
        if (overlay) overlay.classList.remove('active');
        document.body.classList.add('page-loaded');
    });
}

/* -----------------------------------------------------------------------
   Utilities
   ----------------------------------------------------------------------- */
function staggerReveal(selector, delay = 100) {
    document.querySelectorAll(selector).forEach((el, i) => {
        el.style.transitionDelay = `${i * delay}ms`;
        el.classList.add('reveal');
    });
    initScrollReveal();
}

function splitText(element, type = 'words') {
    const text = element.textContent;
    element.textContent = '';
    const parts = type === 'words' ? text.split(' ') : text.split('');
    parts.forEach((part, i) => {
        const span = document.createElement('span');
        span.className = type === 'words' ? 'split-word' : 'split-char';
        span.style.display = 'inline-block';
        span.style.transitionDelay = `${i * (type === 'words' ? 50 : 25)}ms`;
        if (type === 'words') {
            span.textContent = part + (i < parts.length - 1 ? ' ' : '');
        } else {
            span.textContent = part === ' ' ? '\u00A0' : part;
        }
        element.appendChild(span);
    });
    return element;
}

window.animations = {
    staggerReveal,
    splitText,
    initScrollReveal,
    initTimelineAnimation,
    initSkillTagAnimation
};

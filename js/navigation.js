/**
 * Navigation - Mobile Menu & Active States
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initActiveNavState();
});

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');

    if (!toggle || !navList) return;

    if (!navList.id) navList.id = 'primary-navigation';
    toggle.setAttribute('aria-controls', navList.id);
    toggle.setAttribute('aria-expanded', navList.classList.contains('active') ? 'true' : 'false');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navList.classList.toggle('active');
        toggle.setAttribute('aria-expanded', navList.classList.contains('active') ? 'true' : 'false');

        // Prevent body scroll when menu is open
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navList.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navList.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            toggle.classList.remove('active');
            navList.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Set active state based on current page
 */
function initActiveNavState() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Handle index page
        if ((currentPath === '/' || currentPath.endsWith('index.html')) &&
            (href === 'index.html' || href === './')) {
            link.classList.add('active');
        }
        // Handle other pages
        else if (currentPath.includes(href) && href !== 'index.html' && href !== './') {
            link.classList.add('active');
        }
    });
}

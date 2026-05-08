// navbar.js — Django version
// The navbar is already rendered server-side by base.html using Django template tags.
// This file only handles the interactive behaviour (dropdown toggle, mobile menu).
// It does NOT rebuild the navbar HTML — that was causing all links to become .html paths.

function toggleDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropdown = document.getElementById('nav-dropdown');
    if (!dropdown) return;
    const isOpen = dropdown.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) {
        dropdown.classList.add('open');
    }
}

function closeAllDropdowns() {
    document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
        d.classList.remove('open');
    });
}

document.addEventListener('click', closeAllDropdowns);
document.querySelector('#nav-dropdown')?.addEventListener('click', function (e) {
    e.stopPropagation();
});

function toggleMobileMenu() {
    const menu = document.getElementById('nav-mobile-menu');
    const hamburger = document.querySelector('.nav-hamburger');
    if (!menu) return;
    if (menu.classList.contains('open')) {
        closeMobileMenu();
    } else {
        menu.classList.add('open');
        menu.setAttribute('aria-hidden', 'false');
        hamburger?.classList.add('open');
        hamburger?.setAttribute('aria-expanded', 'true');
        document.body.classList.add('nav-menu-open');
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('nav-mobile-menu');
    const hamburger = document.querySelector('.nav-hamburger');
    if (!menu) return;
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-menu-open');
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeMobileMenu();
        closeAllDropdowns();
    }
});

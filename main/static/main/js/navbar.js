(function injectNavStyles() {
    if (document.getElementById('wfm-nav-link')) return;
    const link = document.createElement('link');
    link.id = 'wfm-nav-link';
    link.rel = 'stylesheet';
    link.href = 'assets/css/navbar.css';
    document.head.appendChild(link);
})();

function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function buildNavbar() {
    const user = JSON.parse(localStorage.getItem('wfm_user') || 'null');
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    nav.innerHTML = '';

    const leftDiv = document.createElement('div');
    leftDiv.className = 'nav-left';
    leftDiv.innerHTML = `
        <a href="home.html" class="nav-brand-lockup" aria-label="WFM Home">
            <span class="nav-brand-wfm">WFM</span>
        </a>
    `;
    nav.appendChild(leftDiv);

    const centerDiv = document.createElement('div');
    centerDiv.className = 'nav-center';
    centerDiv.innerHTML = `
        <a href="home.html">Home</a>
        <a href="ourRecipes.html">Our Recipes</a>
        <a href="aboutUs.html">About Us</a>
    `;
    if (user) {
        centerDiv.insertAdjacentHTML('beforeend', `
            <a href="addRecipe.html">Add Recipe</a>
        `);
    }
    if (user && user.is_admin) {
        centerDiv.insertAdjacentHTML('beforeend', `
            <a href="adminDashboard.html">Manage Recipes</a>
        `);
    }


    nav.appendChild(centerDiv);

    const rightDiv = document.createElement('div');
    rightDiv.className = 'nav-right';
    rightDiv.appendChild(buildProfileDropdown(user));
    rightDiv.appendChild(buildHamburger());
    nav.appendChild(rightDiv);

    document.body.appendChild(buildMobileMenu(user));
}

function buildProfileDropdown(user) {
    const wrapper = document.createElement('div');
    wrapper.className = 'nav-profile';

    const btn = document.createElement('a');
    btn.className = 'nav-profile-btn';
    btn.href = '#';
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Account menu');
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';

    const dropdown = document.createElement('div');
    dropdown.className = 'nav-dropdown';

    if (!user) {
        dropdown.innerHTML = `
            <div class="nav-dropdown-header">
                <span class="nav-dropdown-username">Welcome!</span>
                <span class="nav-dropdown-role">Not signed in</span>
            </div>
            <div class="nav-dropdown-body">
                <a href="login.html">🔑 &nbsp;Login</a>
                <a href="register.html">📝 &nbsp;Register</a>
            </div>
        `;
    } else {
        const displayName = user.username || user.name || user.full_name || user.firstName || user.email || 'Profile';
        const roleLabel = user.is_admin ? 'Admin' : 'Member';
        const safeName = escapeHtml(displayName);
        dropdown.innerHTML = `
            <div class="nav-dropdown-header">
                <span class="nav-dropdown-username">${safeName}</span>
                <span class="nav-dropdown-role">${roleLabel}</span>
            </div>
            <div class="nav-dropdown-body">
                <a href="profilePage.html">👤 &nbsp;My Profile</a>
                <div class="nav-dropdown-divider"></div>
                <button type="button" class="nav-dropdown-logout" onclick="logout()">🚪 &nbsp;Logout</button>
            </div>
        `;
    }

    wrapper.appendChild(btn);
    wrapper.appendChild(dropdown);

    btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) {
            dropdown.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });

    document.addEventListener('click', function () { closeAllDropdowns(); });
    dropdown.addEventListener('click', function (e) { e.stopPropagation(); });

    return wrapper;
}

function buildHamburger() {
    const btn = document.createElement('button');
    btn.className = 'nav-hamburger';
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Toggle menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = `
        <span class="nav-hamburger-line"></span>
        <span class="nav-hamburger-line"></span>
        <span class="nav-hamburger-line"></span>
    `;
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    return btn;
}

function buildMobileMenu(user) {
    const overlay = document.createElement('div');
    overlay.className = 'nav-mobile-menu';
    overlay.id = 'nav-mobile-menu';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Navigation menu');

    const isAdmin = user && user.is_admin;
    const displayName = user ? (user.username || user.name || user.full_name || user.firstName || user.email || 'Profile') : null;
    const roleLabel = user ? (user.is_admin ? 'Admin' : 'Member') : null;
    const safeName = displayName ? escapeHtml(displayName) : null;

    const adminLinks = isAdmin ? `
        <a href="adminDashboard.html">⚙️ &nbsp;Manage Recipes</a>
    ` : '';
    const userLinks = user ? `
        <a href="addRecipe.html">➕ &nbsp;Add Recipe</a>
    ` : '';

    let userSection = '';
    if (!user) {
        userSection = `
            <div class="nav-mobile-user">
                <a href="login.html">🔑 &nbsp;Login</a>
                <a href="register.html">📝 &nbsp;Register</a>
            </div>
        `;
    } else {
        userSection = `
            <div class="nav-mobile-user">
                <div class="nav-mobile-user-info">
                    <span class="nav-mobile-username">${safeName}</span>
                    <span class="nav-mobile-role">${roleLabel}</span>
                </div>
                <div class="nav-mobile-divider"></div>
                <a href="profilePage.html">👤 &nbsp;My Profile</a>
                <div class="nav-mobile-divider"></div>
                <button type="button" class="nav-mobile-logout" onclick="logout()">🚪 &nbsp;Logout</button>
            </div>
        `;
    }

    overlay.innerHTML = `
        <div class="nav-mobile-backdrop" id="nav-mobile-backdrop"></div>
        <div class="nav-mobile-panel" role="navigation">
            <div class="nav-mobile-panel-header">
                <a href="home.html" class="nav-mobile-brand" onclick="closeMobileMenu()">
                    <span>WFM</span>
                </a>
                <button type="button" class="nav-mobile-close" onclick="closeMobileMenu()" aria-label="Close menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="nav-mobile-links">
                <a href="home.html">🏠 &nbsp;Home</a>
                <a href="ourRecipes.html">📖 &nbsp;Our Recipes</a>
                <a href="aboutUs.html">ℹ️ &nbsp;About Us</a>
                ${adminLinks}
                ${userLinks}
            </div>
            ${userSection}
        </div>
    `;

    overlay.querySelector('#nav-mobile-backdrop').addEventListener('click', closeMobileMenu);
    overlay.querySelectorAll('.nav-mobile-links a, .nav-mobile-user a').forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });

    return overlay;
}

function toggleMobileMenu() {
    const menu = document.getElementById('nav-mobile-menu');
    const hamburger = document.querySelector('.nav-hamburger');
    if (!menu) return;

    if (menu.classList.contains('open')) {
        closeMobileMenu();
    } else {
        menu.classList.add('open');
        menu.setAttribute('aria-hidden', 'false');
        if (hamburger) {
            hamburger.classList.add('open');
            hamburger.setAttribute('aria-expanded', 'true');
        }
        document.body.classList.add('nav-menu-open');
        const panel = menu.querySelector('.nav-mobile-panel');
        if (panel) {
            setTimeout(function () {
                const first = panel.querySelector('button, a, [tabindex]');
                if (first) first.focus();
            }, 50);
        }
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('nav-mobile-menu');
    const hamburger = document.querySelector('.nav-hamburger');
    if (!menu) return;
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    if (hamburger) {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }
    document.body.classList.remove('nav-menu-open');
}

function closeAllDropdowns() {
    document.querySelectorAll('.nav-dropdown.open').forEach(function (d) { d.classList.remove('open'); });
    document.querySelectorAll('.nav-profile-btn[aria-expanded="true"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeMobileMenu();
        closeAllDropdowns();
    }
});

function logout() {
    localStorage.removeItem('wfm_user');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', buildNavbar);

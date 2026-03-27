(function injectNavStyles() {
    if (document.getElementById('wfm-nav-styles')) return;
    const style = document.createElement('style');
    style.id = 'wfm-nav-styles';
    style.textContent = `
    #main-nav {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) !important;
        align-items: center !important;
        width: 100% !important;
        max-width: 1280px !important;
        margin: 0 auto !important;
        padding: 0 24px !important;
        box-sizing: border-box !important;
        position: relative !important;
        min-height: 68px !important;
        height: auto !important;
        background: transparent !important;
        gap: 16px !important;
    }

    .nav-left {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 0 !important;
        flex-shrink: 0 !important;
        min-width: 0 !important;
        justify-self: start !important;
    }

    .nav-brand-lockup {
        display: inline-flex !important;
        flex-direction: row !important;
        align-items: center !important;
        gap: 12px !important;
        text-decoration: none !important;
        color: var(--sand, #C4A882) !important;
        transition: opacity 0.2s ease, filter 0.2s ease !important;
    }

    .nav-brand-lockup:hover {
        opacity: 0.92 !important;
        filter: brightness(1.06) !important;
    }

    .nav-brand-icon-img {
        width: 38px !important;
        height: 38px !important;
        flex-shrink: 0 !important;
        display: block !important;
        object-fit: contain !important;
        object-position: center !important;
    }

    .nav-brand-wfm {
        font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif !important;
        font-size: 1.65rem !important;
        font-weight: 800 !important;
        letter-spacing: 0.08em !important;
        line-height: 1 !important;
        color: currentColor !important;
    }

    .nav-center {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex-wrap: nowrap !important;
        gap: 6px !important;
        position: static !important;
        left: auto !important;
        transform: none !important;
        justify-self: center !important;
    }

    .nav-center a {
        position: relative !important;
        color: var(--sand, #C4A882) !important;
        text-decoration: none !important;
        font-size: 16px !important;
        font-weight: 600 !important;
        padding: 8px 14px !important;
        border-radius: 8px !important;
        transition: color 0.2s, background 0.2s !important;
        white-space: nowrap !important;
    }
    .nav-center a::after { display: none !important; }
    .nav-center a:hover {
        color: var(--linen, #fff) !important;
        background: rgba(255,255,255,0.07) !important;
    }

    .nav-right {
        display: flex !important;
        align-items: center !important;
        flex-shrink: 0 !important;
        justify-content: flex-end !important;
        justify-self: end !important;
        gap: 8px !important;
    }

    .nav-hamburger {
        display: none !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        width: 42px !important;
        height: 42px !important;
        padding: 0 !important;
        background: linear-gradient(145deg, rgba(176,125,85,0.18), rgba(196,168,130,0.08)) !important;
        border: 1.5px solid rgba(176,125,85,0.45) !important;
        border-radius: 10px !important;
        cursor: pointer !important;
        transition: background 0.2s, border-color 0.2s, box-shadow 0.2s !important;
        color: var(--clay, #B07D55) !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.12) !important;
        gap: 5px !important;
    }

    .nav-hamburger:hover {
        background: linear-gradient(145deg, rgba(176,125,85,0.28), rgba(196,168,130,0.14)) !important;
        border-color: var(--clay, #B07D55) !important;
        box-shadow: 0 4px 14px rgba(0,0,0,0.18) !important;
    }

    .nav-hamburger-line {
        display: block !important;
        width: 20px !important;
        height: 2px !important;
        background: currentColor !important;
        border-radius: 2px !important;
        transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease !important;
    }

    .nav-hamburger.open .nav-hamburger-line:nth-child(1) {
        transform: translateY(7px) rotate(45deg) !important;
    }
    .nav-hamburger.open .nav-hamburger-line:nth-child(2) {
        opacity: 0 !important;
        width: 0 !important;
    }
    .nav-hamburger.open .nav-hamburger-line:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg) !important;
    }

    .nav-mobile-menu {
        display: none !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        z-index: 1500 !important;
        pointer-events: none !important;
    }

    .nav-mobile-backdrop {
        position: absolute !important;
        inset: 0 !important;
        background: rgba(0,0,0,0.55) !important;
        opacity: 0 !important;
        transition: opacity 0.3s ease !important;
        backdrop-filter: blur(2px) !important;
        -webkit-backdrop-filter: blur(2px) !important;
    }

    .nav-mobile-panel {
        position: absolute !important;
        top: 0 !important;
        right: 0 !important;
        width: min(85vw, 320px) !important;
        height: 100% !important;
        background: var(--walnut, #3D2B1F) !important;
        border-left: 1px solid rgba(196,168,130,0.22) !important;
        box-shadow: -8px 0 40px rgba(0,0,0,0.45) !important;
        transform: translateX(100%) !important;
        transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
        overflow-y: auto !important;
        display: flex !important;
        flex-direction: column !important;
        -webkit-overflow-scrolling: touch !important;
    }

    .nav-mobile-menu.open {
        pointer-events: auto !important;
    }

    .nav-mobile-menu.open .nav-mobile-backdrop {
        opacity: 1 !important;
    }

    .nav-mobile-menu.open .nav-mobile-panel {
        transform: translateX(0) !important;
    }

    .nav-mobile-panel-header {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 20px 20px 16px !important;
        border-bottom: 1px solid rgba(196,168,130,0.18) !important;
        flex-shrink: 0 !important;
    }

    .nav-mobile-brand {
        display: inline-flex !important;
        align-items: center !important;
        gap: 10px !important;
        color: var(--sand, #C4A882) !important;
        text-decoration: none !important;
        font-family: 'Inter', system-ui, sans-serif !important;
        font-size: 1.35rem !important;
        font-weight: 800 !important;
        letter-spacing: 0.08em !important;
    }

    .nav-mobile-close {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 36px !important;
        height: 36px !important;
        background: rgba(196,168,130,0.1) !important;
        border: 1px solid rgba(196,168,130,0.25) !important;
        border-radius: 8px !important;
        cursor: pointer !important;
        color: var(--sand, #C4A882) !important;
        transition: background 0.15s, color 0.15s !important;
        flex-shrink: 0 !important;
    }
    .nav-mobile-close:hover {
        background: rgba(196,168,130,0.18) !important;
        color: var(--linen, #E8DDD0) !important;
    }

    .nav-mobile-links {
        padding: 12px 12px !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 2px !important;
        border-bottom: 1px solid rgba(196,168,130,0.16) !important;
    }

    .nav-mobile-links a {
        display: flex !important;
        align-items: center !important;
        padding: 13px 14px !important;
        border-radius: 10px !important;
        color: var(--sand, #C4A882) !important;
        text-decoration: none !important;
        font-size: 15px !important;
        font-weight: 600 !important;
        transition: background 0.15s, color 0.15s !important;
        letter-spacing: 0.01em !important;
    }
    .nav-mobile-links a:hover,
    .nav-mobile-links a:active {
        background: rgba(196,168,130,0.12) !important;
        color: var(--linen, #E8DDD0) !important;
    }
    .nav-mobile-links a::after { display: none !important; }

    .nav-mobile-user {
        padding: 14px 12px !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 2px !important;
    }

    .nav-mobile-user-info {
        padding: 12px 14px 14px !important;
        margin-bottom: 6px !important;
    }

    .nav-mobile-username {
        display: block !important;
        color: var(--linen, #E8DDD0) !important;
        font-size: 15px !important;
        font-weight: 700 !important;
        line-height: 1.3 !important;
    }

    .nav-mobile-role {
        display: block !important;
        color: var(--sand, #C4A882) !important;
        font-size: 11px !important;
        font-weight: 600 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.05em !important;
        margin-top: 3px !important;
        opacity: 0.85 !important;
    }

    .nav-mobile-user a {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        padding: 12px 14px !important;
        border-radius: 10px !important;
        color: var(--sand, #C4A882) !important;
        text-decoration: none !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        transition: background 0.15s, color 0.15s !important;
    }
    .nav-mobile-user a:hover {
        background: rgba(196,168,130,0.12) !important;
        color: var(--linen, #E8DDD0) !important;
    }
    .nav-mobile-user a::after { display: none !important; }

    .nav-mobile-divider {
        height: 1px !important;
        background: rgba(196,168,130,0.14) !important;
        margin: 4px 6px !important;
    }

    .nav-mobile-logout {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        width: 100% !important;
        padding: 12px 14px !important;
        border-radius: 10px !important;
        background: transparent !important;
        border: none !important;
        cursor: pointer !important;
        color: #c97a7a !important;
        font-family: inherit !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        text-align: left !important;
        transition: background 0.15s, color 0.15s !important;
        box-sizing: border-box !important;
    }
    .nav-mobile-logout:hover {
        background: rgba(200,100,100,0.1) !important;
        color: #e8a0a0 !important;
    }

    .nav-profile {
        position: relative !important;
        display: flex !important;
        align-items: center !important;
    }

    .nav-profile-btn {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 42px !important;
        height: 42px !important;
        padding: 0 !important;
        background: linear-gradient(145deg, rgba(176,125,85,0.18), rgba(196,168,130,0.08)) !important;
        border: 1.5px solid rgba(176,125,85,0.45) !important;
        border-radius: 50% !important;
        cursor: pointer !important;
        transition: background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.15s !important;
        color: var(--clay, #B07D55) !important;
        user-select: none !important;
        text-decoration: none !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.12) !important;
    }

    .nav-profile-btn svg {
        width: 22px !important;
        height: 22px !important;
        flex-shrink: 0 !important;
    }

    .nav-profile-btn:hover {
        background: linear-gradient(145deg, rgba(176,125,85,0.28), rgba(196,168,130,0.14)) !important;
        border-color: var(--clay, #B07D55) !important;
        color: var(--sand, #C4A882) !important;
        box-shadow: 0 4px 14px rgba(0,0,0,0.18) !important;
        transform: translateY(-1px) !important;
    }
    .nav-profile-btn:focus-visible {
        outline: 2px solid var(--clay, #B07D55) !important;
        outline-offset: 2px !important;
    }
    .nav-profile-btn::after { display: none !important; }

    .nav-dropdown {
        position: absolute !important;
        top: calc(100% + 10px) !important;
        right: 0 !important;
        min-width: 228px !important;
        background: var(--walnut, #3D2B1F) !important;
        border: 1px solid rgba(196, 168, 130, 0.28) !important;
        border-radius: 12px !important;
        padding: 6px 0 !important;
        box-shadow:
            0 4px 6px rgba(0, 0, 0, 0.12),
            0 20px 48px rgba(0, 0, 0, 0.35) !important;
        opacity: 0 !important;
        transform: translateY(-6px) scale(0.98) !important;
        pointer-events: none !important;
        transition: opacity 0.22s ease, transform 0.22s ease !important;
        z-index: 2000 !important;
        overflow: hidden !important;
    }

    .nav-dropdown.open {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
        pointer-events: auto !important;
    }

    .nav-dropdown-header {
        padding: 14px 18px 12px !important;
        margin: 0 !important;
        border-bottom: 1px solid rgba(196, 168, 130, 0.18) !important;
        background: rgba(0, 0, 0, 0.12) !important;
    }

    .nav-dropdown-username {
        display: block !important;
        color: var(--linen, #E8DDD0) !important;
        font-size: 15px !important;
        font-weight: 700 !important;
        letter-spacing: 0.01em !important;
        line-height: 1.3 !important;
    }

    .nav-dropdown-role {
        display: block !important;
        color: var(--sand, #C4A882) !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        margin-top: 4px !important;
        letter-spacing: 0.04em !important;
        text-transform: uppercase !important;
        opacity: 0.88 !important;
    }

    .nav-dropdown-body {
        padding: 6px !important;
    }

    .nav-dropdown a,
    .nav-dropdown-logout {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 11px 14px !important;
        border-radius: 8px !important;
        color: var(--sand, #C4A882) !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        text-decoration: none !important;
        background: transparent !important;
        border: none !important;
        cursor: pointer !important;
        text-align: left !important;
        transition: background 0.15s ease, color 0.15s ease !important;
        box-sizing: border-box !important;
    }

    .nav-dropdown a::after { display: none !important; }

    .nav-dropdown a:hover {
        background: rgba(196, 168, 130, 0.14) !important;
        color: var(--linen, #E8DDD0) !important;
    }

    .nav-dropdown-divider {
        height: 1px !important;
        background: rgba(196, 168, 130, 0.16) !important;
        margin: 6px 8px !important;
    }

    .nav-dropdown-logout {
        color: #c97a7a !important;
        font-family: inherit !important;
        font-size: 14px !important;
    }

    .nav-dropdown-logout:hover {
        background: rgba(200, 100, 100, 0.12) !important;
        color: #e8a0a0 !important;
    }

    @media (max-width: 1024px) {
        .nav-center a {
            font-size: 15px !important;
            padding: 7px 11px !important;
        }
        #main-nav {
            padding: 0 18px !important;
            gap: 12px !important;
        }
    }

    @media (max-width: 900px) {
        #main-nav {
            grid-template-columns: 1fr auto !important;
            grid-template-rows: auto !important;
            min-height: 60px !important;
            padding: 0 16px !important;
            gap: 8px !important;
        }
        .nav-left {
            grid-column: 1 !important;
            grid-row: 1 !important;
        }
        .nav-right {
            grid-column: 2 !important;
            grid-row: 1 !important;
        }
        .nav-center {
            display: none !important;
        }
        .nav-profile {
            display: none !important;
        }
        .nav-hamburger {
            display: flex !important;
        }
        .nav-mobile-menu {
            display: block !important;
        }
        .nav-brand-wfm {
            font-size: 1.45rem !important;
        }
        .nav-brand-icon-img {
            width: 34px !important;
            height: 34px !important;
        }
    }

    @media (max-width: 480px) {
        #main-nav {
            padding: 0 12px !important;
            min-height: 56px !important;
        }
        .nav-brand-wfm {
            font-size: 1.3rem !important;
        }
        .nav-brand-icon-img {
            width: 30px !important;
            height: 30px !important;
        }
        .nav-mobile-panel {
            width: 100vw !important;
            border-left: none !important;
            border-top: 1px solid rgba(196,168,130,0.2) !important;
        }
    }

    @media (max-width: 360px) {
        #main-nav {
            padding: 0 10px !important;
            min-height: 52px !important;
        }
        .nav-brand-lockup {
            gap: 8px !important;
        }
        .nav-brand-wfm {
            font-size: 1.2rem !important;
        }
        .nav-brand-icon-img {
            width: 28px !important;
            height: 28px !important;
        }
        .nav-hamburger {
            width: 38px !important;
            height: 38px !important;
        }
    }

    body.nav-menu-open {
        overflow: hidden !important;
    }
`;
    document.head.appendChild(style);
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

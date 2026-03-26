// navbar.js — Dynamic Fixed Navigation Bar
// Reads current user from localStorage and builds the correct nav

/* ── Inject navbar-specific styles ─────────────────────────── */
(function injectNavStyles() {
    if (document.getElementById('wfm-nav-styles')) return;
    const style = document.createElement('style');
    style.id = 'wfm-nav-styles';
    style.textContent = `
    /* ── Nav container (grid: brand | centered links | profile) ── */
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
        min-height: 52px !important;
        height: auto !important;
        background: transparent !important;
        gap: 16px !important;
    }

    /* ── LEFT: Logo & brand ── */
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
        font-family: 'Playfair Display', Georgia, serif !important;
        font-size: 1.35rem !important;
        font-weight: 700 !important;
        letter-spacing: 0.06em !important;
        line-height: 1 !important;
        color: currentColor !important;
    }

    /* ── CENTER: Links ── */
    .nav-center {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex-wrap: wrap !important;
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
        font-family: 'Inter', 'Segoe UI', system-ui, sans-serif !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        letter-spacing: 0.02em !important;
        padding: 6px 11px !important;
        border-radius: 7px !important;
        transition: color 0.2s, background 0.2s !important;
        white-space: nowrap !important;
    }
    .nav-center a::after { display: none !important; }
    .nav-center a:hover {
        color: var(--linen, #E8DDD0) !important;
        background: rgba(255,255,255,0.07) !important;
    }
    .nav-center a.nav-active {
        color: var(--linen, #E8DDD0) !important;
        background: rgba(196,168,130,0.13) !important;
        font-weight: 600 !important;
    }

     /* ── RIGHT ── */
    .nav-right {
        display: flex !important;
        align-items: center !important;
        flex-shrink: 0 !important;
        justify-content: flex-end !important;
        justify-self: end !important;
    }

    /* ── Profile button (SVG icon) ── */
    .nav-profile {
        position: relative !important;
        display: flex !important;
        align-items: center !important;
    }

    .nav-profile-btn {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 36px !important;
        height: 36px !important;
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

    @media (max-width: 720px) {
        #main-nav {
            padding: 10px 14px !important;
            gap: 10px !important;
            grid-template-columns: 1fr auto !important;
            grid-template-rows: auto auto !important;
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
            grid-column: 1 / -1 !important;
            grid-row: 2 !important;
            justify-content: center !important;
        }
        .nav-brand-wfm {
            font-size: 1.4rem !important;
        }
        .nav-brand-icon-img {
            width: 34px !important;
            height: 34px !important;
        }
        .nav-center a {
            font-size: 15px !important;
            padding: 6px 10px !important;
        }
    }

    /* ── Dropdown ── */
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

/* ── Build the navbar ───────────────────────────────────────── */
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
    if (user && user.is_admin) {
        centerDiv.insertAdjacentHTML('beforeend', `
            <a href="adminDashboard.html">Manage Recipes</a>
            <a href="addRecipe.html">Add Recipe</a>
        `);
    }
    nav.appendChild(centerDiv);

    // Highlight active page
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    centerDiv.querySelectorAll('a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) link.classList.add('nav-active');
    });

    const rightDiv = document.createElement('div');
    rightDiv.className = 'nav-right';
    rightDiv.appendChild(buildProfileDropdown(user));
    nav.appendChild(rightDiv);
}

/* ── Build profile icon + dropdown ─────────────────────────── */
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
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAllDropdowns(); });

    return wrapper;
}

/* ── Close all open dropdowns ───────────────────────────────── */
function closeAllDropdowns() {
    document.querySelectorAll('.nav-dropdown.open').forEach(function (d) { d.classList.remove('open'); });
    document.querySelectorAll('.nav-profile-btn[aria-expanded="true"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
}

/* ── Logout ────────────────────────────────────────────────── */
function logout() {
    localStorage.removeItem('wfm_user');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', buildNavbar);

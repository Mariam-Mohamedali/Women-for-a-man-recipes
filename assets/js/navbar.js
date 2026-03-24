// navbar.js — Dynamic Fixed Navigation Bar
// Reads current user from localStorage and builds the correct nav

/* ── Inject navbar-specific styles ─────────────────────────── */
(function injectNavStyles() {
    if (document.getElementById('wfm-nav-styles')) return;
    const style = document.createElement('style');
    style.id = 'wfm-nav-styles';
    style.textContent = `

        /* ── Common nav link hover underline ── */
        #main-nav a {
            position: relative;
        }
        #main-nav a::after {
            content: '';
            position: absolute;
            bottom: -3px; left: 0;
            width: 0; height: 2px;
            background: var(--clay);
            border-radius: 2px;
            transition: width 0.22s ease;
        }
        #main-nav a:hover { color: var(--clay); }
        #main-nav a:hover::after { width: 100%; }

        /* ── Profile emoji button ── */
        .nav-profile {
            position: relative;
            display: flex;
            align-items: center;
        }

        .nav-profile-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(196,168,130,0.12);
            border: 1.5px solid rgba(196,168,130,0.30);
            border-radius: 24px;
            padding: 5px 14px 5px 6px;
            cursor: pointer;
            transition: background 0.2s, border-color 0.2s, transform 0.15s;
            color: var(--sand);
            font-size: 14px;
            font-weight: 600;
            white-space: nowrap;
            user-select: none;
            text-decoration: none;
        }

        .nav-profile-btn:hover {
            background: rgba(196,168,130,0.22);
            border-color: var(--clay);
            transform: translateY(-1px);
            color: var(--sand);
        }

        /* Override the underline from common nav link rule */
        .nav-profile-btn::after { display: none !important; }

        .nav-profile-emoji {
            font-size: 18px;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            background: var(--clay);
            border-radius: 50%;
        }

        .nav-profile-chevron {
            font-size: 10px;
            opacity: 0.65;
            transition: transform 0.22s ease;
            display: inline-block;
        }

        .nav-profile-btn.open .nav-profile-chevron {
            transform: rotate(180deg);
        }

        /* ── Dropdown ── */
        .nav-dropdown {
            position: absolute;
            top: calc(100% + 12px);
            right: 0;
            min-width: 210px;
            background: var(--walnut);
            border: 1px solid rgba(196,168,130,0.22);
            border-radius: 14px;
            padding: 8px 0;
            box-shadow: 0 16px 40px rgba(0,0,0,0.32);
            opacity: 0;
            transform: translateY(-8px) scale(0.97);
            pointer-events: none;
            transition: opacity 0.2s ease, transform 0.2s ease;
            z-index: 2000;
        }

        .nav-dropdown.open {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto;
        }

        /* Dropdown header — shows user name & role */
        .nav-dropdown-header {
            padding: 12px 18px 10px;
            border-bottom: 1px solid rgba(196,168,130,0.15);
            margin-bottom: 4px;
        }

        .nav-dropdown-username {
            display: block;
            color: var(--linen);
            font-size: 14px;
            font-weight: 700;
        }

        .nav-dropdown-role {
            display: block;
            color: var(--clay);
            font-size: 12px;
            margin-top: 2px;
        }

        /* Dropdown items */
        .nav-dropdown a,
        .nav-dropdown-logout {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            padding: 10px 18px;
            color: var(--sand);
            font-size: 14px;
            font-weight: 500;
            text-decoration: none;
            background: none;
            border: none;
            cursor: pointer;
            text-align: left;
            transition: background 0.15s, color 0.15s;
            box-sizing: border-box;
        }

        /* Remove underline animation from dropdown links */
        .nav-dropdown a::after { display: none !important; }

        .nav-dropdown a:hover {
            background: rgba(196,168,130,0.10);
            color: var(--linen);
        }

        .nav-dropdown-divider {
            height: 1px;
            background: rgba(196,168,130,0.15);
            margin: 4px 0;
        }

        .nav-dropdown-logout {
            color: #e07878 !important;
            font-family: inherit;
            font-size: 14px;
        }

        .nav-dropdown-logout:hover {
            background: rgba(220,80,80,0.10) !important;
            color: #ff9595 !important;
        }

    `;
    document.head.appendChild(style);
})();

/* ── Build the navbar ───────────────────────────────────────── */
function buildNavbar() {
    const user = JSON.parse(localStorage.getItem('wfm_user') || 'null');
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    nav.innerHTML = '';

    // Common links for everyone
    nav.insertAdjacentHTML('beforeend', `
        <a href="home.html">Home</a>
        <a href="ourRecipes.html">Our Recipes</a>
        <a href="aboutUs.html">About Us</a>
    `);

    if (!user) {
        // ── Guest: Login + Register ──
        nav.insertAdjacentHTML('beforeend', `
            <a href="login.html">Login</a>
            <a href="register.html">Register</a>
        `);

    } else if (user.is_admin) {
        // ── Admin: extra links + profile emoji dropdown ──
        nav.insertAdjacentHTML('beforeend', `
            <a href="adminDashboard.html">Manage Recipes</a>
            <a href="addRecipe.html">Add Recipe</a>
        `);
        nav.appendChild(buildProfileEmoji(user, 'Admin'));

    } else {
        // ── Regular user: profile emoji dropdown only ──
        nav.appendChild(buildProfileEmoji(user, 'Member'));
    }
}

/* ── Build profile emoji button + dropdown ─────────────────── */
function buildProfileEmoji(user, roleLabel) {
    // Support whatever field name your backend stores the name under
    const displayName = user.username
        || user.name
        || user.full_name
        || user.firstName
        || user.email
        || 'Profile';

    // Derive role label from the user object itself so it's always accurate
    const role = user.is_admin ? 'Admin' : (user.role || roleLabel || 'Member');

    // Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'nav-profile';

    // Trigger button
    const btn = document.createElement('a');
    btn.className = 'nav-profile-btn';
    btn.href = '#';
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = `
        <span class="nav-profile-emoji">👤</span>
        <span class="nav-profile-name">${displayName}</span>
        <span class="nav-profile-chevron">▾</span>
    `;

    // Dropdown menu
    const dropdown = document.createElement('div');
    dropdown.className = 'nav-dropdown';
    dropdown.innerHTML = `
        <div class="nav-dropdown-header">
            <span class="nav-dropdown-username">${displayName}</span>
        </div>
        <a href="profilePage.html">👤 &nbsp;My Profile</a>
        <div class="nav-dropdown-divider"></div>
        <button class="nav-dropdown-logout" onclick="logout()">🚪 &nbsp;Logout</button>
    `;

    wrapper.appendChild(btn);
    wrapper.appendChild(dropdown);

    // ── Toggle open / close ──
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) {
            dropdown.classList.add('open');
            btn.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });

    // Close when clicking anywhere outside
    document.addEventListener('click', function () {
        closeAllDropdowns();
    });

    // Stop clicks inside the dropdown from bubbling and closing it
    dropdown.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeAllDropdowns();
    });

    return wrapper;
}

/* ── Close all open dropdowns ───────────────────────────────── */
function closeAllDropdowns() {
    document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
        d.classList.remove('open');
    });
    document.querySelectorAll('.nav-profile-btn.open').forEach(function (b) {
        b.classList.remove('open');
        b.setAttribute('aria-expanded', 'false');
    });
}

/* ── Logout ─────────────────────────────────────────────────── */
function logout() {
    localStorage.removeItem('wfm_user');
    window.location.href = 'login.html';
}

// Run on page load
document.addEventListener('DOMContentLoaded', buildNavbar);

// navbar.js — Dynamic Fixed Navigation Bar
// Reads current user from localStorage and builds the correct nav

function buildNavbar() {
    const user = JSON.parse(localStorage.getItem('wfm_user') || 'null');
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    // The header styles and body padding are now handled purely by root.css

    // Common links for everyone
    let links = `
        <a href="home.html">Home</a>
        <a href="ourRecipes.html">Our Recipes</a>
        <a href="aboutUs.html">About Us</a>
    `;

    if (!user) {
        // Guest: show Login and Register
        links += `
        <a href="login.html">Login</a>
        <a href="register.html">Register</a>
        `;
    } else if (user.is_admin) {
        // Admin: Manage Recipes, Add Recipe, Profile
        links += `
        <a href="adminDashboard.html">Manage Recipes</a>
        <a href="addRecipe.html">Add Recipe</a>
        <a href="profilePage.html">My Profile</a>
        `;
    } else {
        // Regular User: Profile
        links += `
        <a href="profilePage.html">My Profile</a>
        `;
    }

    nav.innerHTML = links;
}

function logout() {
    localStorage.removeItem('wfm_user');
    window.location.href = 'login.html';
}

// Run on page load
document.addEventListener('DOMContentLoaded', buildNavbar);

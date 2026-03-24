// auth.js — Login / Register / Session helpers using localStorage

function registerUser(username, email, password, is_admin) {
    const users = JSON.parse(localStorage.getItem('wfm_users') || '[]');
    const existing = users.find(u => u.email === email || u.username === username);
    if (existing) return { success: false, message: 'Username or email already exists.' };

    const newUser = { id: Date.now(), username, email, password, is_admin };
    users.push(newUser);
    localStorage.setItem('wfm_users', JSON.stringify(users));
    return { success: true };
}

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('wfm_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: 'Invalid email or password.' };
    localStorage.setItem('wfm_user', JSON.stringify(user));
    return { success: true, user };
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('wfm_user') || 'null');
}

function requireAdmin() {
    const user = getCurrentUser();
    if (!user || !user.is_admin) {
        alert('Access denied. Admins only.');
        window.location.href = 'home.html';
    }
}

function requireLogin() {
    const user = getCurrentUser();
    if (!user) {
        alert('Please log in first.');
        window.location.href = 'login.html';
    }
}

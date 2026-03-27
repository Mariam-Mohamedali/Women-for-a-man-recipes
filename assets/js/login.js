function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('E-mail').value;
    const password = document.getElementById('Password').value;
    const result = loginUser(email, password);
    if (result.success) {
        window.location.href = 'home.html';
    } else {
        showToast(result.message, 'error');
    }
}

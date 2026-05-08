document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const password = document.getElementById('password')?.value;
            const confirm = document.getElementById('confirm')?.value;
            const adminRadios = document.querySelector('input[name="is_admin"]:checked');
            const is_admin = adminRadios ? adminRadios.value === 'true' : false;

            if (password !== confirm) {
                document.getElementById('msg').textContent = 'Passwords do not match!';
                return;
            }

            const result = registerUser(username, email, password, is_admin);
            if (result.success) {
                showToast('Registration successful! Please log in.', 'success');
                setTimeout(() => window.location.href = 'login.html', 1500);
            } else {
                document.getElementById('msg').textContent = result.message;
            }
        });
    }
});

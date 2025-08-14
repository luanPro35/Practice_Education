document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = e.target.username.value;
            const password = e.target.password.value;

            console.log('Username:', username);
            console.log('Password:', password);

            alert('Login functionality is not yet implemented.');
        });
    }
});

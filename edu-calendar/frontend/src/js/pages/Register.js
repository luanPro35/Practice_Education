// Register initialization function
function initRegister() {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = e.target.username.value;
            const password = e.target.password.value;
            const confirmPassword = e.target['confirm-password'].value;

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            console.log('Username:', username);
            console.log('Password:', password);

            alert('Registration functionality is not yet implemented.');
        });
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', initRegister);

// Export the function for use in routing
export default initRegister;

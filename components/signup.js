document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const toggleButton = document.getElementById('toggleButton');
    const signupSection = document.getElementById('signupSection');
    const loginSection = document.getElementById('loginSection');

    toggleButton.addEventListener('click', function() {
        if (signupSection.style.display !== 'none') {
            signupSection.style.display = 'none';
            loginSection.style.display = 'block';
            toggleButton.textContent = 'Switch to Sign Up';
        } else {
            signupSection.style.display = 'block';
            loginSection.style.display = 'none';
            toggleButton.textContent = 'Switch to Login';
        }
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('firstname').value,
            lastName: document.getElementById('lastname').value,
            email: document.getElementById('signup-email').value,
            password: document.getElementById('signup-password').value,
            dob: {
                day: document.getElementById('day').value,
                month: document.getElementById('month').value,
                year: document.getElementById('year').value
            },
            gender: document.querySelector('input[name="gender"]:checked').value
        };

        console.log('Sign up form submitted with data:', formData);
        alert('Sign up successful!');
        signupForm.reset();
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            email: document.getElementById('login-email').value,
            password: document.getElementById('login-password').value
        };

        console.log('Login form submitted with data:', formData);
        alert('Login successful!');
        loginForm.reset();
    });
});
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

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sign up successful:', data);
            alert('Sign up successful!');
            signupForm.reset();
            // Toggle to login section
            signupSection.style.display = 'none';
            loginSection.style.display = 'block';
            toggleButton.textContent = 'Switch to Sign Up';
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred during sign up.');
        });
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        fetch(`http://localhost:3000/users?email=${email}`)
        .then(response => response.json())
        .then(users => {
            const user = users[0];
            if (user && user.password === password) {
                console.log('Login successful:', user);
                alert('Login successful!');
                loginForm.reset();
                window.location.href = "./index.html"




            } else {
                alert('Invalid email or password');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred during login.');
        });
    });
});
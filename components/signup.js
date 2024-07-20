document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const toggleButton = document.getElementById('toggleButton');
    const signupSection = document.getElementById('signupSection');
    const loginSection = document.getElementById('loginSection');

    toggleButton.addEventListener('click', function () {
        const signupDisplay = window.getComputedStyle(signupSection).display;
        if (signupDisplay !== 'none') {
            signupSection.style.display = 'none';
            loginSection.style.display = 'block';
            toggleButton.textContent = 'Switch to Sign Up';
        } else {
            signupSection.style.display = 'block';
            loginSection.style.display = 'none';
            toggleButton.textContent = 'Switch to Login';
        }
    });

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const firstName = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastname').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
        const genderElement = document.querySelector('input[name="gender"]:checked');

        if (!firstName || !lastName || !email || !password || !day || !month || !year || !genderElement) {
            alert('Please fill in all fields');
            return;
        }

        const formData = {
            firstName,
            lastName,
            email,
            password,
            dob: { day, month, year },
            gender: genderElement.value
        };

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sign up successful:', data);
            alert('Sign up successful!');
            signupForm.reset();
            signupSection.style.display = 'none';
            loginSection.style.display = 'block';
            toggleButton.textContent = 'Switch to Sign Up';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during sign up.');
        });
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        // const firstName = document.getElementById('firstname').value;

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`)
        .then(response => response.json())
        .then(users => {
            const user = users[0];
            if (user && user.password === password) {
                console.log('Login successful:', user);
                alert('Login successful!');
                loginForm.reset();
                localStorage.setItem("isLogged", JSON.stringify({ id: user.id, email: user.email, firstName: user.firstName }));
                window.location.href = "./index.html";
            } else {
                alert('Invalid email or password');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login.');
        });
    });
});

// Function to open modals
function showModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Function to close modals
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Handle Login Form Submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    // Call your API for login
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.message === 'Login successful!') {
        alert("Login successful!");
        closeModal('loginModal');
    } else {
        alert(data.message);
    }
});

// Handle Signup Form Submission
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    // Call your API for signup
    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    alert(data.message);
});

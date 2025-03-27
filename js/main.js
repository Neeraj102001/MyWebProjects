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
  if (data.success) {
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

// Handle OTP Form Submission
document.getElementById('otpForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const otp = e.target[1].value;

  // Call your API for OTP verification
  const response = await fetch('/api/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp })
  });

  const data = await response.json();
  if (data.success) {
    alert("OTP verified successfully!");
    closeModal('otpModal');
  } else {
    alert(data.message);
  }
});

// Handle Payment Form Submission
document.getElementById('paymentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const cardNumber = e.target[0].value;
  const expiryDate = e.target[1].value;
  const cvv = e.target[2].value;

  // Call your payment gateway API
  const response = await fetch('/api/payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cardNumber, expiryDate, cvv })
  });

  const data = await response.json();
  alert(data.message);
});

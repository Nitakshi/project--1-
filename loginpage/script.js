 // script.js
 document.getElementById('sign-in-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Default email and password
  const defaultEmail = "test@example.com";
  const defaultPassword = "password";

  if (email === defaultEmail && password === defaultPassword) {
      alert('Sign in successful!');
      // Redirect back to original webpage
      window.location.href = 'http://127.0.0.1:5501/index.html'; // Replace with your original webpage URL
  } else {
      alert('Invalid email or password');
  }
});
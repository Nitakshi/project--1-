// Set your Stripe publishable key
const stripe = Stripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY');

const paymentForm = document.getElementById('payment-form');
const cardElement = document.getElementById('card-element');
const cardErrors = document.getElementById('card-errors');
const submitButton = document.getElementById('submit');

// Create a Stripe Element for card input
const card = stripe.elements().create('card');
card.mount('#card-element');

// Handle real-time validation errors from the card Element
card.addEventListener('change', function (event) {
  if (event.error) {
    cardErrors.textContent = event.error.message;
    cardErrors.style.display = 'block';
  } else {
    cardErrors.textContent = '';
    cardErrors.style.display = 'none';
  }
});

paymentForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Disable the button while processing
  submitButton.disabled = true;

  // Collect card data
  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the customer that there was an error
      cardErrors.textContent = result.error.message;
      cardErrors.style.display = 'block';
      submitButton.disabled = false;
    } else {
      // Send the token to your server
      fetch('/charge', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          token: result.token.id,
          amount: Amount // Replace with your actual amount
        })
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.success) {
          // Handle successful payment (e.g., redirect to a thank you page)
          console.log('Payment successful!');
          // Redirect or show a success message
        } else {
          // Handle payment errors
          cardErrors.textContent = data.error.message;
          cardErrors.style.display = 'block';
          submitButton.disabled = false;
        }
      })
      .catch(function(error) {
        // Handle general errors
        console.error('Error:', error);
        cardErrors.textContent = 'Something went wrong. Please try again later.';
        cardErrors.style.display = 'block';
        submitButton.disabled = false;
      });
    }
  });
});
const cartTable = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
const totalAmount = document.getElementById('total-amount');
const checkoutBtn = document.getElementById('checkout-btn');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Sample cart data (replace with your actual data)
let cart = [];

// Function to update the cart total
function updateCartTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    totalAmount.textContent = total.toFixed(2);
}

// Function to render cart items in the table
function renderCart() {
    cartTable.innerHTML = ''; // Clear previous items

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const row = cartTable.insertRow();
        const nameCell = row.insertCell();
        const priceCell = row.insertCell();
        const quantityCell = row.insertCell();
        const subtotalCell = row.insertCell();
        const actionCell = row.insertCell();

        nameCell.textContent = item.name;
        priceCell.textContent = item.price.toFixed(2);
        quantityCell.innerHTML = `<input type="number" class="quantity-input" value="${item.quantity}" data-index="${i}">`;
        subtotalCell.textContent = (item.price * item.quantity).toFixed(2);
        actionCell.innerHTML = `<button class="remove-btn" data-index="${i}">Remove</button>`;
    }

    updateCartTotal(); // Update total after rendering

    // Event listeners for quantity changes and remove button clicks
    const quantityInputs = cartTable.querySelectorAll('.quantity-input');
    const removeBtns = cartTable.querySelectorAll('.remove-btn');
    quantityInputs.forEach(input => {
        input.addEventListener('change', handleQuantityChange);
    });
    removeBtns.forEach(btn => {
        btn.addEventListener('click', handleRemoveItem);
    });
}

// Function to handle adding an item to the cart
function addToCart(productName, productPrice) {
    // Check if the product already exists in the cart
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        // If product exists, increase its quantity
        existingItem.quantity++;
    } else {
        // If product does not exist, add it to the cart
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Update the cart display
    renderCart();
}

// Event listener for "Add to Cart" buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.dataset.name;
        const productPrice = parseFloat(this.dataset.price);
        
        addToCart(productName, productPrice);
        alert('Product added to cart!');
    });
});

// Handle quantity change event
function handleQuantityChange(event) {
    const index = event.target.dataset.index;
    const newQuantity = parseInt(event.target.value);
    cart[index].quantity = newQuantity;
    renderCart(); // Re-render cart to update subtotal and total
}

// Handle remove item event
function handleRemoveItem(event) {
    const index = event.target.dataset.index;
    cart.splice(index, 1);
    renderCart(); // Re-render cart to remove the item
}

// Handle checkout button click - Redirect to checkout page
checkoutBtn.addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5501/payment/payment.html'; // Replace with your actual checkout page URL
});

// Initial rendering of the cart
renderCart();

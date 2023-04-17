const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartTableBody = document.querySelector('table tbody');
let cartTotal = 0;

// Loop through each cart item and add a row to the table
cartItems.forEach((item, index) => {
    // Create a new row
    if (item.quantity) {
        const newRow = document.createElement('tr');

        // Create the product column
        const productColumn = document.createElement('td');
        const productImage = document.createElement('img');
        productImage.src = item.url;
        productImage.alt = 'Product Image';
        const productDetails = document.createElement('div');
        productDetails.classList.add('cart-item-details');
        const productName = document.createElement('h3');
        productName.innerText = item.name;
        productDetails.appendChild(productName);
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.appendChild(productImage);
        cartItem.appendChild(productDetails);
        productColumn.appendChild(cartItem);
        newRow.appendChild(productColumn);

        // Create the price column
        const priceColumn = document.createElement('td');
        priceColumn.innerText = '$' + item.price.toFixed(2);
        newRow.appendChild(priceColumn);

        // Create the quantity column
        const quantityColumn = document.createElement('td');
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.addEventListener('input', (e) => {
            const newQuantity = parseInt(quantityInput.value);
            item.quantity = newQuantity;
            if (item.quantity === 0) {
                newRow.remove();
                cartItems.splice(index, 1);
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartTotal();
            const subtotal = item.price * item.quantity;
            subtotalColumn.innerText = '$' + subtotal.toFixed(2);
        });
        quantityColumn.appendChild(quantityInput);
        newRow.appendChild(quantityColumn);

        // Create the subtotal column
        const subtotalColumn = document.createElement('td');
        const subtotal = item.price * item.quantity;
        subtotalColumn.innerText = '$' + subtotal.toFixed(2);
        newRow.appendChild(subtotalColumn);

        // Add the row to the table body
        cartTableBody.appendChild(newRow);

        // Update the cart total
        cartTotal += subtotal;
    }
});

// Update the cart total in the table footer
const cartTableFooter = document.querySelector('table tfoot tr');
const cartTotalColumn = cartTableFooter.querySelector('td:last-child');
cartTotalColumn.innerText = '$' + cartTotal.toFixed(2);

// Function to update the cart total when the quantity changes
function updateCartTotal() {
    cartTotal = 0;
    cartItems.forEach((item) => {
        const subtotal = item.price * item.quantity;
        cartTotal += subtotal;
    });
    cartTotalColumn.innerText = '$' + cartTotal.toFixed(2);
}

function onCheckout() {
    const checkoutMessage = document.getElementById('checkout-message');
    if (cartItems.length) {
        localStorage.removeItem('cartItems');
        cartTableBody.innerHTML = '';
        cartTotalColumn.innerText = '$0.00';
        checkoutMessage.innerHTML = "Thank you for shopping, your order was placed successfully &#128519;";
        checkoutMessage.style.backgroundColor = "#dff0d8";
        checkoutMessage.style.color = "#3c763d";
    } else {
        checkoutMessage.innerHTML = "Please add some products to your cart before checkout &#128532;";
        checkoutMessage.style.backgroundColor = "rgb(243 160 160)";
        checkoutMessage.style.color = "#ffffff";
    }
    checkoutMessage.style.display = 'block';
}
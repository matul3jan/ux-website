const addToCartButtons = document.querySelectorAll('.fa-cart-plus');

addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const productName = event.target.closest('.detail-box').querySelector('h5').innerText;
        const productPrice = event.target.closest('.detail-box').querySelector('.price_heading').innerText.split(" ")[1];
        const url = event.target.parentElement.parentElement.parentElement.parentElement.querySelector('img').src;

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const item = cartItems.find(item => item.name === productName);
        if (item) {
            item.quantity++;
        } else {
            cartItems.push({ name: productName, price: +productPrice, quantity: 1, url: url });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    });
});

const products = [
    {
        name: "Set of Cups",
        category: "measuring-cups",
        price: 50.0,
        imageSrc: "images/product1.jpg",
    },
    {
        name: "Set of spoons",
        category: "spoons",
        price: 20.0,
        imageSrc: "images/product2.jpg",
    },
    {
        name: "Long knife",
        category: "knives",
        price: 15.0,
        imageSrc: "images/product3.jpg",
    },
    {
        name: "Black spatula",
        category: "spatulas",
        price: 10.0,
        imageSrc: "images/product4.jpg",
    },
    {
        name: "Set of forks",
        category: "forks",
        price: 15.0,
        imageSrc: "images/product5.jpg",
    },
    {
        name: "Bread toaster",
        category: "appliances",
        price: 100.0,
        imageSrc: "images/product6.jpg",
    },
    {
        name: "Electric kettle",
        category: "appliances",
        price: 35.0,
        imageSrc: "images/product7.jpg",
    },
    {
        name: "Non-stick frying pan",
        category: "cookware",
        price: 45.0,
        imageSrc: "images/product8.jpg",
    },
    {
        name: "Cutting board",
        category: "cookware",
        price: 25.0,
        imageSrc: "images/product9.jpg",
    },
    {
        name: "Kitchen timer",
        category: "appliances",
        price: 8.0,
        imageSrc: "images/product10.jpg",
    },
    {
        name: "Mixing bowls",
        category: "cookware",
        price: 30.0,
        imageSrc: "images/product11.jpg",
    },
    {
        name: "Saucepan",
        category: "cookware",
        price: 20.0,
        imageSrc: "images/product12.jpg",
    }
];

const productRow = document.getElementById("product-row");
const sortSelect = document.getElementById("sort-select");
const filterSelect = document.getElementById("filter-select");

// create a function to filter products by category
function filterProducts(products, category) {
    if (category === "all") {
        return products;
    } else {
        return products.filter((product) => product.category === category);
    }
}

// create a function to sort products
function sortProducts(products, sortOption) {
    let sortedProducts = [...products];
    switch (sortOption) {
        case "name-asc":
            sortedProducts.sort((a, b) => (a.name > b.name ? 1 : -1));
            break;
        case "name-desc":
            sortedProducts.sort((a, b) => (a.name < b.name ? 1 : -1));
            break;
        case "price-asc":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        default:
            break;
    }
    return sortedProducts;
}

// create a function to display products
function displayProducts(products) {
    productRow.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const productCol = document.createElement("div");
        productCol.className = "col-md-6 col-lg-4";
        const productBox = document.createElement("div");
        productBox.className = "box";

        const productImgBox = document.createElement("div");
        productImgBox.className = "img-box";

        const productImg = document.createElement("img");
        productImg.src = product.imageSrc;
        productImg.alt = "";

        const productDetailBox = document.createElement("div");
        productDetailBox.className = "detail-box";

        const productName = document.createElement("h5");
        productName.textContent = product.name;

        const productPriceBox = document.createElement("div");
        productPriceBox.className = "price_box";

        const productPriceHeading = document.createElement("h6");
        productPriceHeading.className = "price_heading";
        productPriceHeading.innerHTML = `<span>€</span> ${product.price.toFixed(
            2
        )}`;

        const productCartLink = document.createElement("a");

        const productCartIcon = document.createElement("i");
        productCartIcon.className = "fa fa-cart-plus";
        productCartIcon.style.fontSize = "2em";
        productCartIcon.style.padding = "0px 20px 20px 0px";
        productCartIcon.title = "Add to cart";
        productCartIcon.setAttribute("aria-hidden", "true");

        productCartLink.appendChild(productCartIcon);
        productPriceBox.appendChild(productPriceHeading);
        productPriceBox.appendChild(productCartLink);
        productDetailBox.appendChild(productName);
        productDetailBox.appendChild(productPriceBox);
        productImgBox.appendChild(productImg);
        productBox.appendChild(productImgBox);
        productBox.appendChild(productDetailBox);
        productCol.appendChild(productBox);
        productRow.appendChild(productCol);
    }
};

sortSelect.addEventListener("change", () => {
    const sortedProducts = sortProducts(products, sortSelect.value);
    const filteredProducts = filterProducts(sortedProducts, filterSelect.value);
    displayProducts(filteredProducts);
});

filterSelect.addEventListener("change", () => {
    const filteredProducts = filterProducts(products, filterSelect.value);
    const sortedProducts = sortProducts(filteredProducts, sortSelect.value);
    displayProducts(sortedProducts);
});

// display all products on page load
displayProducts(sortProducts(products, "name-asc"));

// ------------------------------------------------------------------------------------------------------------------------------------------
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

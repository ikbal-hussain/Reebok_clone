document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});
let sampleUser1 = {
    "id": "518d",
    "firstName": "Mukul ",
    "lastName": "K",
    "email": "m@gmail.com",
    "password": "123",
    "dob": {
      "day": "2",
      "month": "5",
      "year": "2001"
    },
    "gender": "MALE"
  }

let apiURL = `https://mock-reebok-api.onrender.com`

function fetchProducts() {
    fetch(`${apiURL}/products`)
        .then(response => response.json())
        .then(products => {
            const productId = getProductIdFromURL();
            const product = products.find(p => p.id === productId);
            renderProductDetails(product);
            renderMoreLikeThis(products, product);
        })
        .catch(error => console.error('Error fetching products:', error));
}

function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('productId')) || 131
}

function renderProductDetails(product) {
    const productDetailsDiv = document.getElementById('product-details');
    productDetailsDiv.innerHTML = `
        <div class="product-details">
            <img src="${product.ImageUrl}" alt="${product.ProductName}">
            <div class="product-info">
                <h1>${product.ProductName}</h1>
                <p class="price">Price: ${product.price}</p>
                <p class="discount">Discount: ${product.discount}</p>
                <p>Gender: ${product.gender}</p>
                <p class="sizes">Sizes: M, L, XL</p>
                ${product.Producttag === "RUNNING SHOES" ? ' <h5>Scan QR code to determine your size with AI</h5><img src="assests/QR Code Primeai.png" alt="QR Code">' : ''}
                <button class="add-to-cart" onclick='addToCart(${JSON.stringify(product)})'>Add to Bag</button>
                <button class="add-to-wishlist" onclick='addToWishlist(${JSON.stringify(product)})'>Add to Wishlist</button>
            </div>
        </div>
    `;
}

function addToCart(product) {
    const users = JSON.parse(localStorage.getItem('users')) || sampleUser1;
    let currentUser = users.id
    fetch(`${apiURL}/users/${currentUser}`)
        .then(response => response.json())
        .then(user => {
            if (!user.cart) {
                user.cart = [];
            }
            const productExists = user.cart.some(item => item.id === product.id);
            if (!productExists) {
                user.cart.push(product);
            }
            return fetch(`${apiURL}/users/${currentUser}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log('Cart updated', data)
            alert("Added to cart")
        })
        .catch(error => console.error('Error:', error));
}

function addToWishlist(product) {
    const users = JSON.parse(localStorage.getItem('users')) || sampleUser1;
    let currentUser = users.id
    fetch(`${apiURL}/users/${currentUser}`)
        .then(response => response.json())
        .then(user => {
            if (!user.wishlist) {
                user.wishlist = [];
            }
            const productExists = user.wishlist.some(item => item.id === product.id);
            if (!productExists) {
                user.wishlist.push(product);
            }
            return fetch(`${apiURL}/users/${currentUser}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log('Wishlist updated', data)
            alert("Added to wishlist")
        } )
        .catch(error => console.error('Error:', error));
}

function renderMoreLikeThis(products, currentProduct) {
    const moreLikeThisDiv = document.getElementById('more-like-this');
    moreLikeThisDiv.innerHTML = '<h2>More like this</h2>';

    const similarProducts = products.filter(p => p.Producttag === currentProduct.Producttag && p.id !== currentProduct.id);
    similarProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.ImageUrl}" alt="${product.ProductName}">
            <p>${product.ProductName}</p>
            <p class="price">Price: ${product.price}</p>
        `;
        moreLikeThisDiv.appendChild(productItem);
    });
}

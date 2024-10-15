document.addEventListener('DOMContentLoaded', async () => {
    const apiURL = 'https://mock-reebok-api.onrender.com';
    const user = JSON.parse(localStorage.getItem('users'));

    if (!user) {
        alert('No user found in localStorage.');
        return;
    }

    document.getElementById('user-name').textContent = `${user.firstName} ${user.lastName}`;

    async function fetchWishlist() {
        try {
            const response = await fetch(`${apiURL}/users/${user.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch wishlist');
            }
            const userData = await response.json();
            displayWishlist(userData.wishlist);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    }

    function displayWishlist(wishlist) {
        const wishlistContainer = document.getElementById('wishlist-products');
        wishlistContainer.innerHTML = '';

        if (!wishlist || wishlist.length == 0) {
            wishlistContainer.innerHTML = '<p>No items in the wishlist.</p>';
            return;
        }

        wishlist.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <span class="selling-fast">SELLING FAST</span>
                <img src="${product.ImageUrl}" alt="${product.name}">
                <p class="product-name">${product.ProductName}</p>
                <p class="product-price"><span class="original-price"></span> ₹${product.price} <span class="discount">${product.discount}</span></p>
                <button class="delete-button">🗑️</button>
                <button class="add-to-bag-button">Add to Bag</button>
            `;

            productCard.querySelector('.delete-button').addEventListener('click', () => {
                removeFromWishlist(product.id);
            });

            productCard.querySelector('.add-to-bag-button').addEventListener('click', () => {
                addToCart(product);
            });

            wishlistContainer.appendChild(productCard);
        });
    }

    async function removeFromWishlist(productId) {
        try {
            const updatedWishlist = user.wishlist.filter(item => item.id !== productId);
            user.wishlist = updatedWishlist;
            localStorage.setItem('users', JSON.stringify(user));

            await fetch(`${apiURL}/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ wishlist: updatedWishlist })
            });

            fetchWishlist();
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    }

    async function addToCart(product) {
        try {
            if (!user.cart) {
                user.cart = [];
            }
            user.cart.push(product);
            localStorage.setItem('users', JSON.stringify(user));

            await fetch(`${apiURL}/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cart: user.cart })
            });

            alert('Product added to cart');
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }

    fetchWishlist();
});

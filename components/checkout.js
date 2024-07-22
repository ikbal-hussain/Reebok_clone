let apiURL = `https://mock-reebok-api.onrender.com`;

document.addEventListener('DOMContentLoaded', () => {
    const sampleUser1 = {
        "id": "518d",
        "firstName": "Mukul",
        "lastName": "K",
        "email": "m@gmail.com",
        "password": "123",
        "dob": {
            "day": "2",
            "month": "5",
            "year": "2001"
        },
        "gender": "MALE",
        "wallet": {
            "balance": 25000,
            "history": []
        }
    };

    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(sampleUser1));
    }

    const orderItemsContainer = document.querySelector('#orderItemsContainer');
    const orderTotalElement = document.querySelector('#orderTotal');
    const walletBalanceElement = document.querySelector('#walletBalance');
    const walletHistoryContainer = document.querySelector('#walletHistoryContainer');
    const payFromWalletBtn = document.querySelector('#payFromWalletBtn');
    const confirmOrderBtn = document.querySelector('#confirmOrderBtn');
    const cancelOrderBtn = document.querySelector('#cancelOrderBtn');
    const walletPasswordInput = document.querySelector('#walletPassword');
    const backToCartBtn = document.querySelector('#backToCartBtn');
    const confirmOrderSection = document.querySelector('#confirmOrderSection');

    let totalAmount = parseInt(localStorage.getItem('bagTotalSum')) || 0;
    orderTotalElement.textContent = totalAmount;

    backToCartBtn.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });

    function displayOrderSummary(cartItems) {
        orderItemsContainer.innerHTML = '';

        if (!cartItems || cartItems.length === 0) {
            orderItemsContainer.innerHTML = '<p>No items in the cart.</p>';
            orderTotalElement.textContent = '0';
            return;
        }

        cartItems.forEach(item => {
            let cleanedPrice = item.price.replace(/[, ]+/g, '');
            let itemPrice = parseInt(cleanedPrice);
            let itemQuantity = parseInt(item.quantity) || 1;
            let itemTotal = itemPrice * itemQuantity;

            let itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <img src="${item.ImageUrl}" alt="">
                <div>
                    <p>${item.ProductName}</p>
                    <p>Price per item: ₹ ${itemPrice}</p>
                </div>
            `;
            orderItemsContainer.appendChild(itemElement);
        });
    }

    async function fetchUser() {
        let currentUser = fetchUserFromLocalStorage().id;
        let data = await fetch(`${apiURL}/users/${currentUser}`);
        let res = await data.json();
        console.log("fetching user, user is", res);
        return res;
    }

    async function fetchOrderItemsFromLocalStorage() {
        let user = await fetchUser();
        displayOrderSummary(user.cart);
    }

    function fetchUserFromLocalStorage() {
        let user = JSON.parse(localStorage.getItem('users')) || sampleUser1;
        if (user && !user.wallet) {
            user.wallet = {
                balance: 25000,
                history: []
            };
            localStorage.setItem('users', JSON.stringify(user));
            updateWalletOnServer(user);
        }
        return user;
    }

    function updateWalletUI(wallet) {
        walletBalanceElement.innerHTML = `<b>${wallet.balance} SS Coins</b>`;
        walletHistoryContainer.innerHTML = '';
        wallet.history.forEach(entry => {
            let entryElement = document.createElement('div');
            entryElement.className = 'wallet-entry';
            entryElement.innerHTML = `<hr>
                <p>Amount: ${entry.amount} SS Coins</p>
                <p>Date: ${entry.date}</p>
                <p>Time: ${entry.time}</p>
            `;
            walletHistoryContainer.appendChild(entryElement);
        });
    }

    function deductFromWallet(user, amount) {
        user.wallet.balance -= amount;
        let now = new Date();
        user.wallet.history.push({
            amount: amount,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString()
        });
        localStorage.setItem('users', JSON.stringify(user));
        updateWalletOnServer(user);
        updateWalletUI(user.wallet);
    }

    function updateWalletOnServer(user) {
        fetch(`${apiURL}/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
          .then(data => console.log('Updated user on server:', data))
          .catch(error => console.error('Error updating user on server:', error));
    }

    async function handleOrderConfirmation() {
        let user = fetchUserFromLocalStorage();
        let walletPassword = walletPasswordInput.value;

        if (walletPassword !== user.password) {
            alert('Incorrect wallet password.');
            return;
        }

        if (user.wallet.balance < totalAmount) {
            alert('Insufficient SS Wallet balance.');
            return;
        }

        deductFromWallet(user, totalAmount);

        // Remove items from the cart
        await clearCartOnServer(user.id);

        // Clear cart items from local storage
        localStorage.removeItem('cartItems');

        // Redirect to thank you page
        window.location.href = 'thankYou.html';
    }

    payFromWalletBtn.addEventListener('click', () => {
        let user = fetchUserFromLocalStorage();
        let walletPassword = walletPasswordInput.value;

        if (walletPassword !== user.password) {
            alert('Incorrect wallet password.');
            return;
        }

        if (user.wallet.balance < totalAmount) {
            alert('Insufficient SS Wallet balance.');
            return;
        }

        confirmOrderSection.style.display = 'block';
        updateWalletUI(user.wallet);
    });

    confirmOrderBtn.addEventListener('click', () => {
        handleOrderConfirmation();
    });

    cancelOrderBtn.addEventListener('click', () => {
        location.reload();
    });

    fetchOrderItemsFromLocalStorage();
    let user = fetchUserFromLocalStorage();
    if (user) {
        updateWalletUI(user.wallet);
    } else {
        console.error('User not found in localStorage.');
    }

    async function clearCartOnServer(userId) {
        return fetch(`${apiURL}/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "cart": [] })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Cart cleared successfully on server:', data);
            return data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
});

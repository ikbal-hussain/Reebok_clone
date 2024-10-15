document.addEventListener('DOMContentLoaded', () => {
    const walletBalanceElement = document.querySelector('#walletBalance');
    const walletHistoryContainer = document.querySelector('#walletHistoryContainer');
    const backToHomeBtn = document.querySelector('#backToHomeBtn');
    const refreshBalanceBtn = document.querySelector('#refreshBalanceBtn');
   let apiURL = `https://mock-reebok-api.onrender.com`
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

    function fetchUserFromLocalStorage() {
        let user = JSON.parse(localStorage.getItem('users')) || sampleUser1;
        if (user && !user.wallet) {
            user.wallet = {
                balance: 25000,
                history: []
            };
            localStorage.setItem('users', JSON.stringify(user));
            updateWalletOnServer(user)
        }
        return user;
    }
    function updateWalletUI(wallet) {
        walletBalanceElement.innerHTML = `<b>${wallet.balance}</b>`;
        walletHistoryContainer.innerHTML = '';
        wallet.history.forEach(entry => {
            let entryElement = document.createElement('div');
            entryElement.className = 'wallet-entry';
            entryElement.innerHTML = `
                <hr>
                <p><strong>Amount:</strong> <span class="amount">${entry.amount} SS Coins</span></p>
                <p><strong>Date:</strong> <span class="date">${entry.date}</span></p>
                <p><strong>Time:</strong> <span class="time">${entry.time}</span></p>
            `;
            walletHistoryContainer.appendChild(entryElement);
        });
    }
    

    backToHomeBtn.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect to home page
    });

    refreshBalanceBtn.addEventListener('click', () => {
        // Optionally, you can add functionality to refresh the balance from an API or similar
        location.reload()
        let user = fetchUserFromLocalStorage();
        if (user) {
            updateWalletUI(user.wallet);
        }
    });

    let user = fetchUserFromLocalStorage();
    if (user) {
        updateWalletUI(user.wallet);
    } else {
        console.error('User not found in localStorage.');
    }

    function updateWalletOnServer(user) {
        fetch(`${apiURL}/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
          .then(data => console.log('Updated user on server:', data))
          .catch(error => console.error('Error updating user on server:', error));
    }
});

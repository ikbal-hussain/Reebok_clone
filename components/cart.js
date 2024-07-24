let apiURL = `https://mock-reebok-api.onrender.com`;
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
 };

document.addEventListener('DOMContentLoaded', () => {
   let homePageBtn = document.querySelector("#homePageBtn");
   homePageBtn.addEventListener('click', () => {
       window.location.href = "index.html";
   });

   let wishlistBtn = document.querySelector("#wishlistBtn");
   wishlistBtn.addEventListener('click', () => {
       window.location.href = "wishlist_products.html";
   });

   let contactUs = document.querySelector("#contactUs");
   contactUs.addEventListener('click', () => {
       window.location.href = "contactUs.html";
   });
   
   let wallet = document.querySelector("#wallet");
   wallet.addEventListener('click', () => {
       window.location.href = "my_wallet.html";
   });

   let currentUser = JSON.parse(localStorage.getItem("users")).id || sampleUser1.id;

   showCartItems();

   async function showCartItems() {
       console.log("showing cart items");
       let cartItemsContainer = document.querySelector("#cart-items-container");
       cartItemsContainer.innerHTML = "";
       let data = await fetchUser();

       if (!data.cart) {
           alert("Cart is Empty. Add items");
       } else {
           let cartSize = data.cart.length;
           let shoppingBag = document.querySelector("#left-section>h1");
           shoppingBag.innerHTML = `MY SHOPPING BAG(${cartSize})`;
           let bagTotal = document.querySelector("#bagTotal");
           bagTotal.innerHTML = `Bag Total(${cartSize})`;
           let checkoutCount = document.querySelector("#checkoutBtn");
           checkoutCount.innerHTML = `CHECKOUT(${cartSize})`;

           let bagTotalSum = 0;

           data.cart.forEach(ele => {
               let card = document.createElement("div");
               card.className = "cart-item";
               card.innerHTML = `<img src=${ele.ImageUrl} alt="">
                   <div class="cart-content">
                       <p>${ele.Producttag}</p>
                       <div class="title-price-div">
                         <p>${ele.ProductName}</p> <p><b>₹${ele.price}</b></p>
                       </div>
                       <div class="size-quantity-div">
                          <div class="size"><p>SIZE</p>
                         <select name="" id="size-select">
                                 <option value="M">M</option>
                                 <option value="L">L</option>
                                 <option value="XL">XL</option>
                         </select>
                       </div>
                          <div class="size"><p>QUANTITY</p>
                         <select name="" class="quantity-select" id="quantity-select">
                                 <option value="1">1</option>
                                 <option value="2">2</option>
                                 <option value="3">3</option>
                         </select>
                       </div>
                       </div>
                       <div id="cart-buttons">
                          <button class="add-to-wishlist-btn"> ADD TO WISHLIST</button>
                          <button  class="removeBtn" data-id="${ele.id}">REMOVE</button>
                       </div>
                   </div> <hr>`;
                 
               cartItemsContainer.append(card);

               let quantityElement = card.querySelector(".quantity-select");
               let cleanedPrice = ele.price.replace(/[, ]+/g, '');
               let quantity = parseInt(quantityElement.value);
               let itemTotal = Number(cleanedPrice) * quantity;
               bagTotalSum += itemTotal;

               quantityElement.addEventListener('change', (event) => {
                   let newQuantity = parseInt(event.target.value);
                   let newItemTotal = Number(cleanedPrice) * newQuantity;
                   bagTotalSum = bagTotalSum - itemTotal + newItemTotal;
                   itemTotal = newItemTotal;
                   updateTotals(bagTotalSum);
               });
           });

           document.querySelectorAll(".removeBtn").forEach(button => {
               button.addEventListener('click', async () => {
                   let cartItemId = button.getAttribute("data-id");
                   await removeFunction(cartItemId);
                   await showCartItems();
               });
           });

           updateTotals(bagTotalSum);

           // Save the total amount to localStorage
           localStorage.setItem('orderTotal', bagTotalSum);
       }
   }

   function updateTotals(bagTotalSum) {
       let bagTotalPrice = document.querySelector("#bagTotalPrice");
       bagTotalPrice.innerHTML = `₹${bagTotalSum}`;
       let totalPayableAmount = document.querySelector("#totalPayableAmount");
       totalPayableAmount.innerHTML = `₹${bagTotalSum}`;
       localStorage.setItem("bagTotalSum", JSON.stringify(bagTotalSum));
   }

   async function fetchUser() {
       let data = await fetch(`${apiURL}/users/${currentUser}`);
       let res = await data.json();
       console.log("fetching user, user is", res);
       return res;
   }

   let checkoutBtn = document.querySelector("#checkoutBtn");
   checkoutBtn.addEventListener('click', () => {
       console.log("checkout button clicked");
       let bagTotalSum = JSON.parse(localStorage.getItem('bagTotalSum')) || 0;
       if (bagTotalSum > 0) {
           window.location.href = 'checkout.html';
       }
   });

   async function removeFunction(cartItemId) {
       console.log("removing cart item of id", cartItemId);
       let user = await fetchUser();
       let cartArray = user.cart.filter(item => cartItemId != item.id);

       await fetch(`${apiURL}/users/${currentUser}`, {
           method: 'PATCH',
           headers: {
               'Content-Type': 'application/json',
           }, 
           body: JSON.stringify({"cart": cartArray})
       });

       localStorage.removeItem('cartItems');
   }
});

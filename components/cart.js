document.addEventListener('DOMContentLoaded', () => {
      let homePageBtn = document.querySelector("#homePageBtn");
      console.log(homePageBtn);
      homePageBtn.addEventListener('click', () => {
          window.location.href = "index.html";
      });
  
      let wishlistBtn = document.querySelector("#wishlistBtn");
      console.log(wishlistBtn);
      wishlistBtn.addEventListener('click', () => {
          window.location.href = "wishlist.html";
      });
  
      let contactUs = document.querySelector("#contactUs");
      contactUs.addEventListener('click', () => {
          window.location.href = "contactUs.html";
      });
  
      let apiURL = `http://localhost:3000`;
      let currentUser = JSON.parse(localStorage.getItem("currentUser")) || 1;
  
      showCartItems();
  
      async function showCartItems() {
          let cartItemsContainer = document.querySelector("#cart-items-container");
          cartItemsContainer.innerHTML = "";
          let data = await fetchCartItems();
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
                                    <option value="L">L</option>
                                    <option value="X">X</option>
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
                             <button class="removeBtn" data-id="${ele.id}">REMOVE</button>
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
                  button.addEventListener('click', () => {
                      let cartItemId = button.getAttribute("data-id");
                      removeFunction(cartItemId);
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
          localStorage.setItem("bagTotalSum", JSON.stringify(bagTotalSum))
      }
  
      async function fetchCartItems() {
          let data = await fetch(`${apiURL}/users/${currentUser}`);
          let res = await data.json();
          return res;
      }
  
      let checkoutBtn = document.querySelector("#checkoutBtn");
      checkoutBtn.addEventListener('click', () => {
          window.location.href = 'checkout.html';
      });
  
      async function removeFunction(cartItemId) {
          let user = await fetchCartItems();
          let cartArray = user.cart;
          cartArray = cartArray.filter(item => {
              return cartItemId != item.id;
          });
          console.log(cartArray);
  
          fetch(`${apiURL}/users/${currentUser}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              }, 
              body: JSON.stringify({"cart": cartArray})
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              console.log('Delete successful:', data);
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
          });
  
          showCartItems();
      }
  });
  
  
  
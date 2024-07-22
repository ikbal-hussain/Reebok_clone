// Mukul js
let login = document.getElementById("login-btn");
let isLogged = JSON.parse(localStorage.getItem("isLogged"));

// Create an element to show the user's first name
let userNameDisplay = document.createElement("span");
userNameDisplay.id = "user-name";
login.parentNode.insertBefore(userNameDisplay, login);

if (isLogged) {
    // Update UI to reflect logged-in status
    userNameDisplay.innerHTML = `Hello, ${isLogged.firstName}`;
    login.innerHTML = "Log out";
    login.addEventListener("click", () => {
        localStorage.removeItem('isLogged');
        window.location.href = "./signup.html";
    });
} else {
    userNameDisplay.innerHTML = "";
    login.innerHTML = "Login";
    login.addEventListener("click", () => {
        window.location.href = "./signup.html";
    });
}
// Mukul js End

const shoe_category = document.getElementById('shoe_category');

document.addEventListener("DOMContentLoaded", ()=> {
  fetch("http://localhost:3000/products")
    .then(response => response.json())
    .then(product => {
      const container = document.getElementById("card-container");
      container.innerHTML = "";
      product = product.slice(0, 20);
      console.log(product)
      product.forEach(products => {
        
        
          const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = products.ImageUrl;
        card.appendChild(img);

        const tag = document.createElement("div");
        tag.textContent = products.Producttag;
        card.appendChild(tag);

        const details = document.createElement("div");
        details.className = "card-details";

        const name = document.createElement("div");
        name.textContent = products.ProductName;
        details.appendChild(name);

        const price = document.createElement("div");
        price.className = "card-price";
        price.textContent = products.price;
        details.appendChild(price);
        card.appendChild(details);
        container.appendChild(card);
        
        
      });
    });
        
        
                
})

const showData = async(data) => {
  const shoe_category = document.getElementById("shoe_category");
        

}

let homePageLogo = document.getElementById("homePageLogo")
homePageLogo.addEventListener('click', ()=>{
      window.location.href = index.html
})
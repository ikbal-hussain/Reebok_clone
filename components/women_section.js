// Mukul js
let login = document.getElementById("login-btn");
let isLogged = JSON.parse(localStorage.getItem("isLogged"));
let productsData = []; // Global variable to store fetched products
let cartItems = []; // Array to store selected product objects
// Create an element to show the user's first name
let userNameDisplay = document.createElement("span");
userNameDisplay.id = "user-name";
login.parentNode.insertBefore(userNameDisplay, login);

if (isLogged) {
  // Update UI to reflect logged-in status
  userNameDisplay.innerHTML = `Hello, ${isLogged.firstName}`;
  login.innerHTML = "Log out";
  login.addEventListener("click", () => {
    localStorage.removeItem("isLogged");
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

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("card-container");
  const Runningbtn = document.getElementById("Runningbtn");
  const Tshirtbtn = document.getElementById("Tshirtbtn");
  const Walkingbtn = document.getElementById("Walkingbtn");
  const Classicbtn = document.getElementById("Classicbtn");

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://mock-reebok-api.onrender.com/products"
      );
      const data = await response.json();
      productsData = data;
      showData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to display data
  const showData = (products) => {
    container.innerHTML = ""; // Clear previous content

    products.forEach((products) => {
      if (products.gender === "Female") {
        // ...card creation logic here ...
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = products.ImageUrl;
        card.appendChild(img);

        const cart = document.createElement("button");
        cart.className = "AddToCart";
        cart.innerHTML =
          '<span class="material-symbols-outlined">favorite</span>';
        cart.dataset.productId = products.id;

        card.appendChild(cart);

        const tag = document.createElement("div");
        tag.textContent = products.Producttag;
        card.appendChild(tag);

        const details = document.createElement("div");
        details.className = "card-details";

        const name = document.createElement("div");
        name.textContent = products.ProductName;
        cart.dataset.name = products.ProductName;
        details.appendChild(name);

        const price = document.createElement("div");
        price.className = "card-price";
        price.textContent = products.price;
        cart.dataset.Price = products.price;
        details.appendChild(price);
        card.appendChild(details);
        container.appendChild(card);
      }
    });

    document.querySelectorAll(".AddToCart").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.currentTarget.dataset.productId;
        addToCart(productId);
      });
    });
  };

  // Function to filter products based on category
  const filterProducts = (category) => {
    if (category === "All") {
      showData(productsData); // Show all products
    } else {
      const filteredProducts = productsData.filter(
        (product) => product.Producttag === category
      );
      showData(filteredProducts); // Show filtered products
    }
  };

  // Event listeners for category buttons
  Runningbtn.addEventListener("click", () => filterProducts("RUNNING SHOES"));
  Tshirtbtn.addEventListener("click", () => filterProducts("T-SHIRTS"));
  Walkingbtn.addEventListener("click", () => filterProducts("WALKING SHOES"));
  Classicbtn.addEventListener("click", () => filterProducts("All")); // Show all products

  fetchData();
});

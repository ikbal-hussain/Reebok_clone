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
// Mukul js End


// carousel function

const shoe_category = document.getElementById('shoe_category');

document.addEventListener("DOMContentLoaded", ()=> {
  fetch("http://localhost:3000/products")
    .then(response => response.json())
    .then(product => {
      const container = document.getElementById("card-container");
      container.innerHTML = "";
      product = product.slice(0, 15);
      product.forEach(products => {
        
        if(products.Producttag === "RUNNING SHOES"){
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
        }
      });
    });
        
        
                
})


// carousel function
let currentIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(".carousel-item");
  const totalSlides = slides.length;

  if (index >= totalSlides) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = totalSlides - 1;
  } else {
    currentIndex = index;
  }

  const offset = -currentIndex * 100;
  document.querySelector(
    ".carousel-inner"
  ).style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

// Optional: Auto-slide
setInterval(nextSlide, 5000);

// // carousel function
let currentIndex2 = 0;

function showSlide2(index) {
  const slides2 = document.querySelectorAll(".carousel-item2");
  const totalSlides2 = slides2.length;

  if (index >= totalSlides2) {
    currentIndex2 = 0;
  } else if (index < 0) {
    currentIndex2 = totalSlides2 - 1;
  } else {
    currentIndex2 = index;
  }

  const offset2 = -currentIndex2 * 100;
  document.querySelector(
    ".carousel-inner2"
  ).style.transform = `translateX(${offset2}%)`;
}

function nextSlide2() {
  showSlide2(currentIndex2 + 1);
}

function prevSlide2() {
  showSlide2(currentIndex2 - 1);
}

// Optional: Auto-slide
setInterval(nextSlide2, 5000);

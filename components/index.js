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
// let currentIndex2 = 0;

// function showSlide(index) {
//   const slides = document.querySelectorAll(".carousel-item2");
//   const totalSlides = slides.length;

//   if (index >= totalSlides) {
//     currentIndex2 = 0;
//   } else if (index < 0) {
//     currentIndex2 = totalSlides - 1;
//   } else {
//     currentInde2x = index;
//   }

//   const offset = -currentIndex2 * 100;
//   document.querySelector(
//     ".carousel-inner2"
//   ).style.transform = `translateX(${offset}%)`;
// }

// function nextSlide() {
//   showSlide(currentIndex2 + 1);
// }

// function prevSlide() {
//   showSlide(currentIndex2 - 1);
// }

// // Optional: Auto-slide
// setInterval(nextSlide, 5000);

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("card-container");
  const Runningbtn = document.getElementById("Runningbtn");
  const Tshirtbtn = document.getElementById("Tshirtbtn");
  const Walkingbtn = document.getElementById("Walkingbtn");
  const Classicbtn = document.getElementById("Classicbtn");

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
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
        card.append(cart);

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
    Runningbtn.addEventListener("click", () => {
      const runningCategory = products.filter(
        (products) => products.Producttag === "RUNNING SHOES"
      );
      showData(runningCategory);
    });
    Tshirtbtn.addEventListener("click", () => {
      const TshirtCategory = products.filter(
        (products) => products.Producttag === "T-SHIRTS"
      );
      showData(TshirtCategory);
    });
    Walkingbtn.addEventListener("click", () => {
      const WalkingCategory = products.filter(
        (products) => products.Producttag === "WALKING SHOES"
      );
      showData(WalkingCategory);
    });
    
    // // eventlistener for adding products to cart
    // document.querySelectorAll(".AddToCart").forEach((button) => {
    //   button.addEventListener("click", (event) => {
    //     const productId = event.target.
    //   })
    // })
  };

  fetchData();
});

let productsData = []; // Global variable to store fetched products
let selectedProducts = []; // Array to store selected product objects

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("card-container");
  const Runningbtn = document.getElementById("Runningbtn");
  const Tshirtbtn = document.getElementById("Tshirtbtn");
  const Walkingbtn = document.getElementById("Walkingbtn");
  const Classicbtn = document.getElementById("Classicbtn");
  const sortSelect = document.getElementById("sort-by-price");

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      productsData = data; // Store fetched data globally
      showData(productsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to display data
  const showData = (products) => {
    container.innerHTML = ""; // Clear previous content
    const selectedValue = sortSelect.value;
    let sortedProducts = [...products]; // Create a copy to avoid modifying original data

    if (selectedValue === "ascending") {
      sortedProducts.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/,/g, ""));
        const priceB = parseFloat(b.price.replace(/,/g, ""));
        return priceA - priceB;
      });
    } else if (selectedValue === "descending") {
      sortedProducts.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/,/g, ""));
        const priceB = parseFloat(b.price.replace(/,/g, ""));
        return priceB - priceA;
      });
    }

    sortedProducts.forEach((product) => {
      if (product.gender === "Female") {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = product.ImageUrl;
        card.appendChild(img);

        const cart = document.createElement("button");
        cart.className = "AddToCart";
        cart.innerHTML =
          '<span class="material-symbols-outlined">favorite</span>';
        cart.dataset.productId = product.id; // Add product ID for add-to-cart functionality

        card.appendChild(cart);

        const tag = document.createElement("div");
        tag.textContent = product.Producttag;
        card.appendChild(tag);

        const details = document.createElement("div");
        details.className = "card-details";

        const name = document.createElement("div");
        name.textContent = product.ProductName;
        cart.dataset.name = product.ProductName; // Add product name for add-to-cart functionality
        details.appendChild(name);

        const price = document.createElement("div");
        price.className = "card-price";
        price.textContent = product.price;
        cart.dataset.Price = product.price; // Add product price for add-to-cart functionality
        details.appendChild(price);

        card.appendChild(details);
        container.appendChild(card);
      }
    });

    products.forEach((product) => {
      if (product.gender === "Female") {
        // ...card creation logic here ...
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = product.ImageUrl;
        card.appendChild(img);

        const cart = document.createElement("button");
        cart.className = "AddToCart";
        cart.innerHTML =
          '<span class="material-symbols-outlined">favorite</span>';
        cart.dataset.productId = product.id;

        card.appendChild(cart);

        const tag = document.createElement("div");
        tag.textContent = product.Producttag;
        card.appendChild(tag);

        const details = document.createElement("div");
        details.className = "card-details";

        const name = document.createElement("div");
        name.textContent = product.ProductName;
        cart.dataset.name = product.ProductName;
        details.appendChild(name);

        const price = document.createElement("div");
        price.className = "card-price";
        price.textContent = product.price;
        cart.dataset.Price = product.price;
        details.appendChild(price);

        card.appendChild(details);
        container.appendChild(card);
      }
    });

    const addToCart = async (productId) => {
      const product = productsData.find((p) => p.id === productId);

      if (product) {
        try {
          const response = await fetch("http://localhost:3000/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          });

          if (response.ok) {
            console.log("Product added to cart:", product);
            // Handle successful addition
          } else {
            console.error(
              "Error adding product to cart:",
              await response.text()
            );
          }
        } catch (error) {
          console.error("Error adding product to cart:", error);
        }
      } else {
        console.error("Product not found:", productId);
      }
    };

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
  // sortSelect.addEventListener("change", () => {
  //   showData(productsData); // Re-display products with updated sorting
  // });

  fetchData();
});

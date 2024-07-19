document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("card-container");

  // Function to display data
  const showData = (products) => {
    container.innerHTML = ""; // Clear previous content

    products.forEach((product) => {
      if (product.gender === "Female") {
        // ...card creation logic here ...
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
  };

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

  fetchData();
});

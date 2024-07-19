
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


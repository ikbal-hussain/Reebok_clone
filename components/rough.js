sortSelect.addEventListener("change", () => {
  const selectedValue = sortSelect.value;
  if (selectedValue === "none") {
    // No sorting required
    return;
  }

  const sortedProducts = [...productsData];

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

  showData(sortedProducts); // Display the sorted products
});

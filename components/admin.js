
let apiURL = `https://mock-reebok-api.onrender.com`
document.addEventListener('DOMContentLoaded', function () {
    fetchUsers();
    fetchProducts();
    document.getElementById('product-form').addEventListener('submit', handleProductFormSubmit);
});

function fetchUsers() {
    fetch(`${apiURL}/users`)
        .then(response => response.json())
        .then(data => {
            const userTableBody = document.querySelector('#user-table tbody');
            userTableBody.innerHTML = '';
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td> ${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.dob.day}/${user.dob.month}/${user.dob.year}</td>
                    <td>${user.gender}</td>
                `;
                userTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

function fetchProducts() {
    fetch(`${apiURL}/products`)
        .then(response => response.json())
        .then(data => {
            const productTableBody = document.querySelector('#product-table tbody');
            productTableBody.innerHTML = '';
            data.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td><img src="${product.ImageUrl}" alt="${product.ProductName}" width="50"></td>
                    <td>${product.ProductName}</td>
                    <td>${product.Producttag}</td>
                    <td>${product.price}</td>
                    <td>${product.discount}</td>
                    <td>${product.gender}</td>
                    <td>
                        <button id="editBtn" onclick="editProduct(${product.id})">Edit</button>
                        <button  id="deleteBtn"onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                `;
                productTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

function showAddProductForm() {
    document.getElementById('form-title').textContent = 'Add Product';
    document.getElementById('product-id').value = '';
    document.getElementById('product-image').value = '';
    document.getElementById('product-name').value = '';
    document.getElementById('product-tag').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-discount').value = '';
    document.getElementById('product-gender').value = '';
    document.getElementById('product-modal').style.display = 'block';
}

function handleProductFormSubmit(event) {
    event.preventDefault();
    const id = document.getElementById('product-id').value;
    const product = {
        ImageUrl: document.getElementById('product-image').value,
        ProductName: document.getElementById('product-name').value,
        Producttag: document.getElementById('product-tag').value,
        price: document.getElementById('product-price').value,
        discount: document.getElementById('product-discount').value,
        gender: document.getElementById('product-gender').value
    };
    if (id) {
        updateProduct(id, product);
    } else {
        addProduct(product);
    }
}

function addProduct(product) {
    fetch(`${apiURL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(() => {
            fetchProducts();
            closeModal();
        })
        .catch(error => console.error('Error adding product:', error));
}

function editProduct(id) {
    fetch(`${apiURL}/products/${id}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById('form-title').textContent = 'Edit Product';
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-image').value = product.ImageUrl;
            document.getElementById('product-name').value = product.ProductName;
            document.getElementById('product-tag').value = product.Producttag;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-discount').value = product.discount;
            document.getElementById('product-gender').value = product.gender;
            document.getElementById('product-modal').style.display = 'block';
        })
        .catch(error => console.error('Error fetching product:', error));
}

function updateProduct(id, product) {
    fetch(`${apiURL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(() => {
            fetchProducts();
            closeModal();
        })
        .catch(error => console.error('Error updating product:', error));
}

function deleteProduct(id) {
    fetch(`${apiURL}/products/${id}`, {
        method: 'DELETE'
    })
        .then(() => fetchProducts())
        .catch(error => console.error('Error deleting product:', error));
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

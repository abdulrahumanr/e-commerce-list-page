// Dummy product data
const products = [
  { id: 1, name: "Smartphone", price: 199, category: "electronics", image: "images/smartphone.jpg" },
  { id: 2, name: "Laptop", price: 999, category: "electronics", image: "images/laptop.jpg" },
  { id: 3, name: "T-shirt", price: 25, category: "fashion", image: "images/tshirt.jpg" },
  { id: 4, name: "Blender", price: 79, category: "home", image: "images/blender.jpg" },
  { id: 5, name: "Headphones", price: 49, category: "electronics", image: "images/headphone.jpg" },
  { id: 6, name: "Jacket", price: 89, category: "fashion", image: "images/jacket.jpg" },
  // Add more products as needed
];

// Select DOM elements
const productGrid = document.querySelector('.product-grid');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const sortFilter = document.getElementById('sort-filter');
const cartNotification = document.getElementById('cart-notification');

// Create product cards dynamically
function renderProducts(filteredProducts) {
  productGrid.innerHTML = ''; // Clear existing products
  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// Handle adding product to cart
function handleAddToCart(event) {
  if (event.target.classList.contains('add-to-cart')) {
    cartNotification.classList.add('show');
    setTimeout(() => cartNotification.classList.remove('show'), 3000);
  }
}

// Filters and Sorting
function filterAndSortProducts() {
  let filteredProducts = products;

  // Filter by category
  const category = categoryFilter.value;
  if (category !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }

  // Filter by price range
  const maxPrice = parseInt(priceFilter.value, 10);
  filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);

  // Sort by price
  const sortOrder = sortFilter.value;
  if (sortOrder === 'low-to-high') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high-to-low') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  renderProducts(filteredProducts);
}

// Show the price range as a label
priceFilter.addEventListener('input', () => {
  document.getElementById('price-range').textContent = `Price: $0 - $${priceFilter.value}`;
});

// Initial render and event listeners
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products); // Initially render all products

  // Event listeners for filters and sorting
  categoryFilter.addEventListener('change', filterAndSortProducts);
  priceFilter.addEventListener('input', filterAndSortProducts);
  sortFilter.addEventListener('change', filterAndSortProducts);

  // Add to cart button listener
  productGrid.addEventListener('click', handleAddToCart);
});

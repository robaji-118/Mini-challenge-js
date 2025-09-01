import { products } from '../data/products.js';
import { addProductToCart } from './cart.js';

const productsGrid = document.getElementById('products');

export const renderProducts = (filters = {}) => {
  if (!productsGrid) return;
  
  const { q = '', category = '', size = '' } = filters;
  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(q.toLowerCase());
    const matchesCategory = category === '' || product.category === category;
    const matchesSize = size === '' || (product.sizes && product.sizes.includes(size));
    return matchesQuery && matchesCategory && matchesSize;
  });

  productsGrid.innerHTML = '';
  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = '<p class="text-center">Produk tidak ditemukan.</p>';
  }

  filteredProducts.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>Rp${product.price.toLocaleString('id-ID')}</p>
        <div class="sizes">
          ${product.sizes.map(s => `<span class="size-tag">${s}</span>`).join('')}
        </div>
      </div>
      <button class="btn btn--primary add-to-cart-btn" data-id="${product.id}">+ Keranjang</button>
    `;
    productsGrid.appendChild(productCard);
  });
};

export const setupStoreListeners = () => {
  if (productsGrid) {
    productsGrid.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = e.target.dataset.id;
        const product = products.find(p => p.id === productId);
        if (product) {
          addProductToCart(product);
        }
      }
    });
  }
};
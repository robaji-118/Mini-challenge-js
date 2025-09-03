import { products } from '../data/products.js';
import { addProductToCart } from './cart.js';
import { updateCartCount } from './ui.js';

const productsGrid = document.getElementById('products');
const cartModal = document.getElementById('cart');
const btnCart = document.getElementById('btn-cart');
const cartCloseBtn = document.getElementById('cart-close');

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
    // Gunakan jalur gambar yang benar dan tambahkan onerror untuk debugging
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/200x200?text=Gambar%20Tidak%20Ditemukan';" />
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

  // Tambahkan event listener untuk membuka dan menutup modal
  if (btnCart && cartModal) {
    btnCart.addEventListener('click', () => {
      cartModal.classList.add('visible');
    });
  }

  if (cartCloseBtn && cartModal) {
    cartCloseBtn.addEventListener('click', () => {
      cartModal.classList.remove('visible');
    });
  }

  // Menutup modal saat mengklik di luar area modal
  if (cartModal) {
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) {
        cartModal.classList.remove('visible');
      }
    });
  }
};

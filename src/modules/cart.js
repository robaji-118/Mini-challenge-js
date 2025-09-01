import { save, load, LS_CART, showToast } from './utils.js';

const cartItemsContainer = document.getElementById('cart-items');
const cartCountSpan = document.getElementById('cart-count');
const cartTotalStrong = document.getElementById('cart-total');
const cartModalBackdrop = document.getElementById('cart');

let cart = load(LS_CART, []);

export const addProductToCart = (product) => {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  save(LS_CART, cart);
  updateCartUI();
  showToast(`${product.name} ditambahkan ke keranjang`, 'success');
};

export const removeProductFromCart = (productId) => {
  cart = cart.filter((item) => item.id !== productId);
  save(LS_CART, cart);
  updateCartUI();
  showToast('Produk dihapus dari keranjang', 'info');
};

const updateCartUI = () => {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Keranjang Anda kosong.</p>';
  }

  cart.forEach((item) => {
    const cartItemEl = document.createElement('div');
    cartItemEl.className = 'cart-item';
    cartItemEl.innerHTML = `
      <div class="cart-item__info">
        <span>${item.name}</span>
        <span>(${item.quantity})</span>
      </div>
      <div class="cart-item__price">Rp${(item.price * item.quantity).toLocaleString('id-ID')}</div>
      <button class="btn btn--danger btn-remove" data-id="${item.id}">Hapus</button>
    `;
    cartItemsContainer.appendChild(cartItemEl);
    total += item.price * item.quantity;
  });

  if (cartCountSpan) {
    cartCountSpan.textContent = cart.length;
  }
  if (cartTotalStrong) {
    cartTotalStrong.textContent = `Rp${total.toLocaleString('id-ID')}`;
  }
};

export const setupCartListeners = () => {
  updateCartUI();
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-remove')) {
        const productId = e.target.dataset.id;
        removeProductFromCart(productId);
      }
    });
  }

  const btnCart = document.getElementById('btn-cart');
  const cartClose = document.getElementById('cart-close');
  const btnCheckout = document.getElementById('btn-checkout');

  if (btnCart) {
    btnCart.addEventListener('click', () => {
      if (cartModalBackdrop) {
        cartModalBackdrop.classList.add('visible');
      }
    });
  }

  if (cartClose) {
    cartClose.addEventListener('click', () => {
      if (cartModalBackdrop) {
        cartModalBackdrop.classList.remove('visible');
      }
    });
  }

  if (cartModalBackdrop) {
    cartModalBackdrop.addEventListener('click', (e) => {
      if (e.target.id === 'cart') {
        cartModalBackdrop.classList.remove('visible');
      }
    });
  }

  if (btnCheckout) {
    btnCheckout.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast("Keranjang kosong, tidak bisa checkout.", "error");
        return;
      }
      if (getAuthUser()) {
        alert("Checkout berhasil! Barang akan segera diproses.");
        cart.length = 0;
        save(LS_CART, cart);
        updateCartUI();
        if (cartModalBackdrop) {
          cartModalBackdrop.classList.remove('visible');
        }
      } else {
        alert("Silakan login untuk melanjutkan checkout.");
      }
    });
  }
};

// Tambahkan getAuthUser di sini karena checkout memerlukannya
export const getAuthUser = () => {
    return load(LS_AUTH, null);
};
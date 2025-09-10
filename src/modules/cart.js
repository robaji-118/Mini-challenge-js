/// cart.js


import { save, load, LS_CART, showToast } from './utils.js';

const cartItemsContainer = document.getElementById('cart-items');
const cartCountSpan = document.getElementById('cart-count');
const cartTotalStrong = document.getElementById('cart-total');
const cartModalBackdrop = document.getElementById('cart');
const btnCheckout = document.getElementById('btn-checkout');

let cart = load(LS_CART, []);

export const addProductToCart = (product) => {
  // Tambahkan produk ke keranjang, memastikan kuantitas dan properti size
  const existingItem = cart.find((item) => item.id === product.id && item.size === product.size);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Pastikan item memiliki properti size yang dipilih
    cart.push({ ...product, quantity: 1 });
  }

  save(LS_CART, cart);
  updateCartUI();
  showToast(`${product.name} (${product.size}) ditambahkan ke keranjang`, 'success');
};



const decreaseProductQuantity = (productId) => {
const item = cart.find(item => item.id === productId);
if (item) {
 item.quantity -= 1;
 if (item.quantity <= 0) {
 removeProductFromCart(productId);
 } else {
 save(LS_CART, cart);
 updateCartUI();
 showToast(`Jumlah ${item.name} dikurangi`, 'info');
 }
}
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
 <div class="cart-item-image">
  <img src="${item.image}" alt="${item.name}">
 </div>
 <div class="cart-item-details">
  <span class="cart-item-name">${item.name}</span>
  <span class="cart-item-size">Ukuran: ${item.size}</span>
  <div class="cart-item-quantity">
  <button class="btn btn--small btn--secondary btn-decrease" data-id="${item.id}">-</button>
  <span>${item.quantity}</span>
  <button class="btn btn--small btn--secondary btn-increase" data-id="${item.id}">+</button>
  </div>
 </div>
 <div class="cart-item-actions">
  <div class="cart-item-price">Rp${(item.price * item.quantity).toLocaleString('id-ID')}</div>
  <button class="btn btn--danger btn-remove" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
 </div>
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
 const target = e.target;
 const productId = target.dataset.id;
 if (target.classList.contains('btn-remove')) {
  removeProductFromCart(productId);
 } else if (target.classList.contains('btn-decrease')) {
  decreaseProductQuantity(productId);
 } else if (target.classList.contains('btn-increase')) {
  addProductToCart(cart.find(item => item.id === productId));
 }
 });
}

const btnCart = document.getElementById('btn-cart');
const cartClose = document.getElementById('cart-close');

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

// --- FUNGSI CHECKOUT BARU ---
if (btnCheckout) {
  btnCheckout.addEventListener('click', () => {
   if (cart.length === 0) {
    showToast("Keranjang kosong, tidak bisa checkout.", "error");
    return;
   }

   // Ganti showAlert dengan showToast
   showToast("Checkout berhasil! Barang akan segera diproses.", "success");

   // Bersihkan keranjang
   cart.length = 0;
   save(LS_CART, cart);

   // Perbarui UI
   updateCartUI();

   // Tutup modal
   if (cartModalBackdrop) {
    cartModalBackdrop.classList.remove('visible');
   }
  });
 }
// --- AKHIR FUNGSI CHECKOUT BARU ---
};
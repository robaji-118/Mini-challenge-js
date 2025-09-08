import { getAuthUser, logout } from './modules/auth.js';
import { setupStoreListeners, renderProducts } from './modules/store.js';
import { setupCartListeners } from './modules/cart.js';
import { showToast } from './modules/utils.js';

// Pastikan semua kode event listener berada di dalam DOMContentLoaded
// agar elemen HTML sudah tersedia saat skrip dijalankan.
document.addEventListener('DOMContentLoaded', () => {
  const qInput = document.getElementById('q');
  const categorySelect = document.getElementById('category');
  const sizeSelect = document.getElementById('size');
  const btnLogout = document.getElementById('btn-logout');

  const user = getAuthUser();
  const btnLogin = document.getElementById('btn-login');
  const navActions = document.getElementById('nav-actions');
  const shopView = document.getElementById('shop-view');
  const guestMenu = document.getElementById('guest-menu');
  const header = document.getElementById(`app-header`)

  if (user) {
    // Jika user sudah login
    if (btnLogin) btnLogin.classList.add('hidden');
    if (navActions) navActions.classList.remove('hidden');
    if (shopView) shopView.classList.remove('hidden');
    if (guestMenu) guestMenu.classList.add('hidden');
    renderProducts();
  } else {
    // Jika user belum login
    // if (btnLogin) btnLogin.classList.remove('hidden');
    // if (navActions) navActions.classList.add('hidden');
    // if (shopView) shopView.classList.add('hidden');
    // if (guestMenu) guestMenu.classList.remove('hidden');
    if (header) header.classList.add(`hidden`)
  }

  setupStoreListeners();
  setupCartListeners();

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      logout();
      window.location.href = 'auth.html';
    });
  }

  // Event listeners untuk filter harus berada di dalam scope DOMContentLoaded
  if (qInput) {
    qInput.addEventListener('input', () => {
      const filters = {
        q: qInput.value,
        category: categorySelect.value,
        size: sizeSelect.value,
      };
      renderProducts(filters);
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', () => {
      const filters = {
        q: qInput.value,
        category: categorySelect.value,
        size: sizeSelect.value,
      };
      renderProducts(filters);
    });
  }

  if (sizeSelect) {
    sizeSelect.addEventListener('change', () => {
      const filters = {
        q: qInput.value,
        category: categorySelect.value,
        size: sizeSelect.value,
      };
      renderProducts(filters);
    });
  }
});
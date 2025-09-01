import { getAuthUser, logout } from './modules/auth.js';
import { setupStoreListeners, renderProducts } from './modules/store.js';
import { setupCartListeners } from './modules/cart.js';
import { showToast } from './modules/utils.js';

const qInput = document.getElementById('q');
const categorySelect = document.getElementById('category');
const sizeSelect = document.getElementById('size');
const btnLogout = document.getElementById('btn-logout');

document.addEventListener('DOMContentLoaded', () => {
  const user = getAuthUser();
  const btnLogin = document.getElementById('btn-login');
  const navActions = document.getElementById('nav-actions');
  const shopView = document.getElementById('shop-view');

  if (user) {
    if (btnLogin) btnLogin.classList.add('hidden');
    if (navActions) navActions.classList.remove('hidden');
    if (shopView) shopView.classList.remove('hidden');
    renderProducts();
  } else {
    if (btnLogin) btnLogin.classList.remove('hidden');
    if (navActions) navActions.classList.add('hidden');
    if (shopView) shopView.classList.add('hidden');
  }

  setupStoreListeners();
  setupCartListeners();

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      logout();
      window.location.href = 'auth.html';
    });
  }
});

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
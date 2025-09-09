import { login, register } from './modules/auth.js';
import { showAlert } from './modules/utils.js'; 

const loginForm = document.getElementById('form-login');
const registerForm = document.getElementById('form-register');
const tabs = document.querySelector('.tabs');

document.addEventListener('DOMContentLoaded', () => {
  if (tabs) {
    tabs.addEventListener('click', (e) => {
      const tab = e.target.dataset.tab;
      if (tab === 'login') {
        loginForm.classList.add('visible');
        registerForm.classList.remove('visible');
        e.target.classList.add('active');
        tabs.querySelector('[data-tab="register"]').classList.remove('active');
      } else if (tab === 'register') {
        loginForm.classList.remove('visible');
        registerForm.classList.add('visible');
        e.target.classList.add('active');
        tabs.querySelector('[data-tab="login"]').classList.remove('active');
      }
    });
  }
});

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');
    try {
      login({ email, password });
      window.location.href = 'index.html';
      // showAlert('Login berhasil!', 'success'); // Contoh penggunaan
    } catch (error) {
      showAlert(error.message, 'error'); // Tampilkan alert jika login gagal
    }
  });
}

if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirm = formData.get('confirm');
    try {
      register({ name, email, password, confirm });
      document.querySelector('[data-tab="login"]').click();
    } catch (error) {
      alert(error.message);
    }
  });
}


////////// visivle password
document.addEventListener('DOMContentLoaded', () => {
  const passwordToggles = document.querySelectorAll('.password-toggle-icon');

  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      // Dapatkan elemen input password yang terkait
      const passwordInput = toggle.previousElementSibling;
      const icon = toggle.querySelector('i');

      if (passwordInput.type === 'password') {
        // Jika tipe input adalah 'password', ubah ke 'text'
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      } else {
        // Jika tipe input adalah 'text', ubah kembali ke 'password'
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      }
    });
  });
});


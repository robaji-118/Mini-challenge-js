export const LS_USERS = 'users';
export const LS_CART = 'cart';
export const LS_AUTH = 'auth';

export const save = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const load = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error loading data from localStorage for key: ${key}`, error);
    return defaultValue;
  }
};

export const showToast = (message, type = 'info') => {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.className = `toast toast--${type}`;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
};

export const showAlert = (message, type = 'info') => {
  const alertContainer = document.getElementById('alert');
  const alertMessage = document.getElementById('alert-message');
  const alertCloseBtn = document.getElementById('alert-close');

  if (!alertContainer || !alertMessage) return;

  // Setel pesan dan tipe alert
  alertMessage.textContent = message;
  const alertBox = alertContainer.querySelector('.alert');
  alertBox.classList.remove('alert--success', 'alert--error', 'alert--info');
  alertBox.classList.add(`alert--${type}`);

  // Tambahkan kelas 'top' dan 'visible' untuk menampilkan alert dengan animasi
  // Hapus kelas 'hidden' untuk memastikan alert terlihat
  alertContainer.classList.add('top', 'visible');
  alertContainer.classList.remove('hidden');

  // Sembunyikan alert secara otomatis setelah 5 detik
  setTimeout(() => {
    alertContainer.classList.remove('visible');
    // Sembunyikan elemen sepenuhnya setelah animasi selesai
    setTimeout(() => {
      alertContainer.classList.add('hidden');
    }, 500); // Tunggu selama 0.5 detik sesuai durasi animasi
  }, 5000);

  // Tambahkan event listener untuk tombol tutup
  if (alertCloseBtn) {
    alertCloseBtn.onclick = () => {
      alertContainer.classList.remove('visible');
      // Sembunyikan elemen sepenuhnya setelah animasi selesai
      setTimeout(() => {
        alertContainer.classList.add('hidden');
      }, 500);
    };
  }
};
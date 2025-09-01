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

  alertMessage.textContent = message;
  alertContainer.className = `alert-container visible`;
  
  
  const alertBox = alertContainer.querySelector('.alert');
  alertBox.classList.remove('alert--success', 'alert--error', 'alert--info');
  
  
  alertBox.classList.add(`alert--${type}`);

 
  setTimeout(() => {
    alertContainer.classList.remove('visible');
  }, 5000);

 
  if (alertCloseBtn) {
    alertCloseBtn.onclick = () => {
      alertContainer.classList.remove('visible');
    };
  }
};
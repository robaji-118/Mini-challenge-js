import { save, load, LS_USERS, LS_AUTH, showToast } from './utils.js';

const users = load(LS_USERS, []);

export const register = ({ name, email, password, confirm }) => {
  email = email.toLowerCase().trim();
  if (password.length < 6) {
    throw new Error("Password minimal 6 karakter");
  }
  if (password !== confirm) {
    throw new Error("Konfirmasi password tidak cocok");
  }
  if (users.some((u) => u.email === email)) {
    throw new Error("Email sudah terdaftar");
  }

  const user = { id: crypto.randomUUID(), name, email, password };
  users.push(user);
  save(LS_USERS, users);
  showToast('Pendaftaran berhasil!', 'success');
  return user;
};

export const login = ({ email, password }) => {
  email = email.toLowerCase().trim();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Email atau password salah");
  }

  save(LS_AUTH, user);
  showToast('Login berhasil!', 'success');
  return user;
};

export const logout = () => {
  localStorage.removeItem(LS_AUTH);
  showToast('Logout berhasil!', 'info');
};

export const getAuthUser = () => {
  return load(LS_AUTH, null);
};
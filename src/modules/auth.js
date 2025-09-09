import { save, load, LS_USERS, LS_AUTH, showAlert } from './utils.js';

const users = load(LS_USERS, []);

export const register = ({ name, email, password, confirm }) => {
  email = email.toLowerCase().trim();

  // Validasi: pastikan semua input terisi
  if (!name || !email || !password || !confirm) {
    throw new Error("Semua input harus diisi.");
  }

  // Validasi: password minimal 6 karakter
  if (password.length < 6) {
    throw new Error("Password minimal 6 karakter.");
  }
  
  // Validasi: password harus mengandung setidaknya satu angka
  if (!/\d/.test(password)) {
    throw new Error("Password harus mengandung setidaknya satu angka.");
  }

  // Validasi: konfirmasi password harus cocok
  if (password !== confirm) {
    throw new Error("Konfirmasi password tidak cocok.");
  }

  // Validasi: cek apakah email sudah terdaftar
  if (users.some((u) => u.email === email)) {
    throw new Error("Email sudah terdaftar.");
  }

  const user = { id: crypto.randomUUID(), name, email, password };
  users.push(user);
  save(LS_USERS, users);
  showAlert('Pendaftaran berhasil!', 'success');
  return user;
};

export const login = ({ email, password }) => {
  email = email.toLowerCase().trim();

  // Validasi: pastikan email dan password terisi
  if (!email || !password) {
    throw new Error("Email dan password harus diisi.");
  }

  // Validasi: password harus mengandung setidaknya satu angka
  if (!/\d/.test(password)) {
    throw new Error("Password Salah");
  }

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Email atau password salah.");
  }

  save(LS_AUTH, user);
  showAlert('Login berhasil!', 'success');
  return user;
};

export const logout = () => {
  localStorage.removeItem(LS_AUTH);
  showAlert('Logout berhasil!', 'info');
};

export const getAuthUser = () => {
  return load(LS_AUTH, null);
};
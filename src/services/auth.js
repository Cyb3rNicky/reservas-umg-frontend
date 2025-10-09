import { api } from '../lib/api';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

function saveSession({ token, user }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function register({ email, password, rol = 'usuario', telefono }) {
  const data = await api.post('/api/auth/register', { email, password, rol, telefono });
  saveSession(data);
  return data.user;
}

export async function login({ email, password }) {
  const data = await api.post('/api/auth/login', { email, password });
  saveSession(data);
  return data.user;
}

export async function me() {
  return api.get('/api/auth/me', { auth: true });
}

export function logout() {
  clearSession();
}

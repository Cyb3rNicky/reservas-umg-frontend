export const ENV = {
  API_URL: import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3000',
};

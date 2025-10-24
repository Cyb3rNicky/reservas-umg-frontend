import { api } from '../lib/api';

export function listarReservas() {
  return api.get('/api/reservas', { auth: true });
}

export function crearReserva({ evento_id, cantidad }) {
  return api.post('/api/reservas', { evento_id, cantidad: Number(cantidad) }, { auth: true });
}

export function getReserva(id) {
  return api.get(`/api/reservas/${id}`, { auth: true });
}

export function cancelarReserva(id) {
  return api.delete(`/api/reservas/${id}`, { auth: true });
}

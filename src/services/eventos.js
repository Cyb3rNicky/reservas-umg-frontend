// services/eventos.js
import { api } from '../lib/api';

export async function listarEventosActivos() {
  return api.get('/api/eventos');
}

export async function getEvento(id) {
  return api.get(`/api/eventos/${id}`);
}

export async function crearEvento(payload) {
  return api.post('/api/eventos', payload, { auth: true });
}

export async function actualizarEvento(id, payload) {
  return api.put(`/api/eventos/${id}`, payload, { auth: true });
}

export async function eliminarEvento(id) {
  return api.delete(`/api/eventos/${id}`, { auth: true });
}

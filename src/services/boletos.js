import { api } from '../lib/api';

export function listarBoletos() {
  return api.get('/api/boletos', { auth: true });
}

export function verificarBoleto(codigo) {
  return api.post('/api/boletos/verificar', { codigo }, { auth: true });
}

export function usarBoleto(id) {
  return api.put(`/api/boletos/${id}/usar`, {}, { auth: true });
}

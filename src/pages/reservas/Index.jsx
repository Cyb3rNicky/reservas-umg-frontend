import { useEffect, useState } from 'react';
import { listarReservas, cancelarReserva } from '../../services/reservas';

export default function ReservasIndex() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const cargar = async () => {
    try {
      setLoading(true); setErr('');
      const data = await listarReservas();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e.message || 'Error al cargar');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  const onCancel = async (id) => {
    if (!confirm('¿Cancelar esta reserva?')) return;
    try { await cancelarReserva(id); await cargar(); } catch(e) { setErr(e.message); }
  };

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900">Mis Reservas</h2>
      {err && <div className="mt-3 rounded bg-red-50 border border-red-200 p-3 text-sm text-red-700">{err}</div>}
      <div className="mt-4 overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Evento</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Lugar</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {items.length ? items.map(r => (
              <tr key={r.id}>
                <td className="px-4 py-3 text-sm">{r.id}</td>
                <td className="px-4 py-3 text-sm">{r.titulo}</td>
                <td className="px-4 py-3 text-sm">{r.lugar || '—'}</td>
                <td className="px-4 py-3 text-sm">{r.cantidad}</td>
                <td className="px-4 py-3 text-xs font-mono">{r.codigo_confirmacion}</td>
                <td className="px-4 py-3 text-sm">
                  <button onClick={() => onCancel(r.id)} className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-500">
                    Cancelar
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">{loading ? 'Cargando…' : 'Sin reservas'}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

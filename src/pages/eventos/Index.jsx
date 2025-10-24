import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listarEventosActivos, eliminarEvento } from '../../services/eventos';

function fmt(dt) {
  if (!dt) return '—';
  const d = new Date(dt);
  return isNaN(d) ? dt : d.toLocaleString();
}

export default function EventosIndex() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const cargar = async () => {
    setErr('');
    try {
      setLoading(true);
      const data = await listarEventosActivos();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e.message || 'Error al cargar');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  const onDelete = async (id) => {
    if (!confirm('¿Eliminar evento? Esta acción no se puede deshacer.')) return;
    try {
      setLoading(true);
      await eliminarEvento(id);
      await cargar();
    } catch (e) {
      setErr(e.message || 'No se pudo eliminar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">Eventos</h2>
        <Link
          to="/admin/eventos/create"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Crear evento
        </Link>
      </div>

      {err && <div className="mx-4 mb-3 rounded bg-red-50 border border-red-200 p-3 text-sm text-red-700">{err}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Inicia</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Termina</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Lugar</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Aforo</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {items.length ? items.map(ev => (
              <tr key={ev.id}>
                <td className="px-4 py-3 text-sm">{ev.id}</td>
                <td className="px-4 py-3 text-sm">{ev.titulo}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{fmt(ev.inicia_en)}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{fmt(ev.termina_en)}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{ev.lugar || '—'}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{ev.aforo}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/eventos/${ev.id}/edit`}
                      className="rounded-md bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-500"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => onDelete(ev.id)}
                      disabled={loading}
                      className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-500 disabled:opacity-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-500">
                  {loading ? 'Cargando…' : 'No hay eventos.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

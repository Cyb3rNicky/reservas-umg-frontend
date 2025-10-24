import { useEffect, useState } from 'react';
import { listarBoletos } from '../../services/boletos';

export default function BoletosIndex() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try { setLoading(true); setErr(''); setItems(await listarBoletos()); }
      catch(e) { setErr(e.message || 'Error al cargar'); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900">Mis Boletos</h2>
      {err && <div className="mt-3 rounded bg-red-50 border border-red-200 p-3 text-sm text-red-700">{err}</div>}
      <div className="mt-4 overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Evento</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Usado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {items.length ? items.map(b => (
              <tr key={b.id}>
                <td className="px-4 py-3 text-sm">{b.id}</td>
                <td className="px-4 py-3 text-sm">{b.titulo}</td>
                <td className="px-4 py-3 text-xs font-mono">{b.codigo}</td>
                <td className="px-4 py-3 text-sm">{b.usado ? 'Sí' : 'No'}</td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-500">{loading ? 'Cargando…' : 'Sin boletos'}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';

export default function EventForm({ form, setForm, onSubmit, submitting, error, title = 'Evento' }) {
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const baseInput =
    'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 ' +
    '-outline-offset-1 outline-gray-300 placeholder:text-gray-400 ' +
    'focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6';

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-lg p-6 space-y-6">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>

      {error && (
        <div className="rounded bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Título */}
        <div className="sm:col-span-2">
          <label className="block text-sm/6 font-medium text-gray-900">Título</label>
          <div className="mt-2">
            <input
              name="titulo"
              required
              value={form.titulo}
              onChange={onChange}
              className={baseInput}
              placeholder="Nombre del evento"
              type="text"
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="sm:col-span-2">
          <label className="block text-sm/6 font-medium text-gray-900">Descripción</label>
          <div className="mt-2">
            <textarea
              name="descripcion"
              rows={3}
              value={form.descripcion}
              onChange={onChange}
              className={baseInput}
              placeholder="Detalles del evento"
            />
          </div>
        </div>

        {/* Inicia */}
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Inicia en</label>
          <div className="mt-2">
            <input
              type="datetime-local"
              name="inicia_en"
              required
              value={form.inicia_en}
              onChange={onChange}
              className={baseInput}
              step="1"
            />
          </div>
        </div>

        {/* Termina */}
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Termina en</label>
          <div className="mt-2">
            <input
              type="datetime-local"
              name="termina_en"
              value={form.termina_en}
              onChange={onChange}
              className={baseInput}
              step="1"
            />
          </div>
        </div>

        {/* Lugar */}
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Lugar</label>
          <div className="mt-2">
            <input
              name="lugar"
              value={form.lugar}
              onChange={onChange}
              className={baseInput}
              placeholder="Auditorio, salón, etc."
              type="text"
            />
          </div>
        </div>

        {/* Aforo */}
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Aforo</label>
          <div className="mt-2">
            <input
              name="aforo"
              type="number"
              min={0}
              required
              value={form.aforo}
              onChange={onChange}
              className={baseInput}
              placeholder="0"
            />
          </div>
        </div>

        {/* Estado (solo en edición) */}
        {'estado' in form && (
          <div className="sm:col-span-2">
            <label className="block text-sm/6 font-medium text-gray-900">Estado</label>
            <div className="mt-2">
              <select name="estado" value={form.estado} onChange={onChange} className={baseInput}>
                <option value={0}>Borrador/Cerrado</option>
                <option value={1}>Publicado/Activo</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Link
          to="/admin/eventos"
          className="rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
        >
          {submitting ? 'Guardando…' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}

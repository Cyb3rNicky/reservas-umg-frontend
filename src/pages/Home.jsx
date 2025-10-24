import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listarEventosActivos } from '../services/eventos';
import { getUser } from '../services/auth';

const IMAGE_URL =
  'https://images.unsplash.com/photo-1514845505178-849cebf1a91d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987';

function fmtFecha(dt) {
  if (!dt) return '—';
  const d = new Date(dt);
  return isNaN(d) ? dt : d.toLocaleString();
}

function truncate(text = '', max = 180) {
  if (!text) return '';
  return text.length > max ? text.slice(0, max).trim() + '…' : text;
}

export default function Home() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const user = getUser();
  const isAdmin = user?.rol === 'admin';

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr('');
        const data = await listarEventosActivos();
        setEventos(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr(e.message || 'Error al cargar eventos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Eventos
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Descubre y gestiona los próximos eventos publicados.
          </p>

          {err && (
            <div className="mt-6 rounded bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {err}
            </div>
          )}

          {loading ? (
            <div className="mt-10 text-sm text-gray-500">Cargando…</div>
          ) : eventos.length === 0 ? (
            <div className="mt-10 text-sm text-gray-500">No hay eventos publicados por ahora.</div>
          ) : (
            <div className="mt-12 space-y-16 lg:mt-16">
              {eventos.map((ev) => (
                <article key={ev.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                  <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                    <img
                      alt={ev.titulo}
                      src={IMAGE_URL}
                      className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <time dateTime={ev.inicia_en} className="text-gray-500">
                        {fmtFecha(ev.inicia_en)}
                      </time>
                      {ev.lugar && (
                        <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                          {ev.lugar}
                        </span>
                      )}
                      <span className="relative z-10 rounded-full bg-indigo-50 px-3 py-1.5 font-medium text-indigo-700">
                        Aforo: {ev.aforo}
                      </span>
                    </div>

                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        <span className="absolute inset-0" />
                        {ev.titulo}
                      </h3>
                      <p className="mt-4 text-sm/6 text-gray-600">
                        {truncate(ev.descripcion, 220)}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-3 border-t border-gray-900/5 pt-6">
                      {/* CTA público: (a futuro) detalle / reservar */}
                      {/* <Link to={`/eventos/${ev.id}`} className="text-sm font-semibold text-indigo-700 hover:text-indigo-600">
                        Ver detalles →
                      </Link> */}

                      {isAdmin && (
                        <>
                          <Link
                            to={`/admin/eventos/${ev.id}/edit`}
                            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
                          >
                            Editar
                          </Link>
                          <Link
                            to="/admin/eventos"
                            className="text-sm font-semibold text-gray-600 hover:text-gray-800"
                            title="Ir al listado admin"
                          >
                            Ir al Admin →
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

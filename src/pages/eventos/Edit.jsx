import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventForm from './EventForm';
import { getEvento, actualizarEvento } from '../../services/eventos';

function toLocalInput(dt) {
  if (!dt) return '';
  const d = new Date(dt);
  if (isNaN(d)) return dt; // por si ya viene como 'YYYY-MM-DDTHH:mm'
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function EventosEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: '', descripcion: '',
    inicia_en: '', termina_en: '',
    lugar: '', aforo: 0, estado: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const ev = await getEvento(id);
        if (!alive) return;
        setForm({
          titulo: ev.titulo ?? '',
          descripcion: ev.descripcion ?? '',
          inicia_en: toLocalInput(ev.inicia_en),
          termina_en: toLocalInput(ev.termina_en),
          lugar: ev.lugar ?? '',
          aforo: ev.aforo ?? 0,
          estado: ev.estado ?? 1,
        });
      } catch (e) {
        setError(e.message || 'No se pudo cargar el evento');
      } finally {
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setSubmitting(true);
      const payload = {
        ...form,
        aforo: Number(form.aforo ?? 0),
        estado: Number(form.estado ?? 0),
      };
      await actualizarEvento(id, payload);
      navigate('/admin/eventos');
    } catch (e) {
      setError(e.message || 'No se pudo actualizar');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-sm text-gray-600">Cargando…</div>;

  return (
    <EventForm
      form={form}
      setForm={setForm}
      onSubmit={onSubmit}
      submitting={submitting}
      error={error}
      title="Editar Evento"
    />
  );
}

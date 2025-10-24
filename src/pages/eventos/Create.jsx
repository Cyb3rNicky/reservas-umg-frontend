import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from './EventForm';
import { crearEvento } from '../../services/eventos';

export default function EventosCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: '', descripcion: '',
    inicia_en: '', termina_en: '',
    lugar: '', aforo: 0,
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setSubmitting(true);
      // Backend espera fechas "YYYY-MM-DD HH:mm:ss" o ISO válido; datetime-local entrega "YYYY-MM-DDTHH:mm"
      const payload = {
        ...form,
        aforo: Number(form.aforo ?? 0),
      };
      await crearEvento(payload);
      navigate('/admin/eventos');
    } catch (err) {
      setError(err.message || 'No se pudo crear el evento');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <EventForm
      form={form}
      setForm={setForm}
      onSubmit={onSubmit}
      submitting={submitting}
      error={error}
      title="Crear Evento"
    />
  );
}

'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Toast } from '../Toast/Toast';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface TrainingRoomFormProps {
  roomToEdit?: any; // Si existe, es modo edición
}

const TrainingRoomForm: React.FC<TrainingRoomFormProps> = ({ roomToEdit }) => {
  const { userData } = useAuth(); // Para validar el rol
  const router = useRouter();
  const [isFunctional, setIsFunctional] = useState<boolean>(
    roomToEdit?.type === 'Funcional' || false
  );

  // Validación con Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Nombre requerido'),
    capacity: Yup.number().required('Capacidad requerida').positive().integer(),
    schedule: Yup.string().required('Horario requerido'),
    days: Yup.string().required('Días de actividad requerido'),
    type: Yup.string()
      .oneOf(['Musculación', 'Funcional'])
      .required('Tipo requerido'),
    trainer: Yup.string().when('type', {
      is: 'Funcional',
      then: Yup.string().required('Nombre del entrenador requerido'),
      otherwise: Yup.string().nullable(),
    }),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      name: roomToEdit?.name || '',
      capacity: roomToEdit?.capacity || '',
      schedule: roomToEdit?.schedule || '',
      days: roomToEdit?.days || '',
      type: roomToEdit?.type || '',
      trainer: roomToEdit?.trainer || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (userData?.role !== 'ADMIN' && userData?.role !== 'TRAINER_ADMIN') {
          Toast.fire({
            icon: 'error',
            title: 'No tienes permisos para esta acción.',
          });
          return;
        }

        const method = roomToEdit ? 'PUT' : 'POST';
        const url = roomToEdit
          ? `${API_URL}/rooms/${roomToEdit.id}`
          : `${API_URL}/rooms`;

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error('Error al guardar la sala');

        Toast.fire({
          icon: 'success',
          title: roomToEdit
            ? 'Sala actualizada con éxito'
            : 'Sala creada con éxito',
        });
        router.push('/admin/rooms'); // Redirige al listado de salas
      } catch (error) {
        Toast.fire({ icon: 'error', title: 'Error al guardar la sala' });
      }
    },
  });

  // Manejo del tipo funcional
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setIsFunctional(value === 'Funcional');
    formik.setFieldValue('type', value);
    if (value !== 'Funcional') formik.setFieldValue('trainer', '');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-holtwood text-center mb-4">
        {roomToEdit ? 'Editar Sala' : 'Crear Sala de Entrenamiento'}
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block mb-1">Nombre de la Sala</label>
          <input
            type="text"
            {...formik.getFieldProps('name')}
            className="w-full border p-2 rounded"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500">{formik.errors.name}</p>
          )}
        </div>

        {/* Capacidad */}
        <div>
          <label className="block mb-1">Capacidad</label>
          <input
            type="number"
            {...formik.getFieldProps('capacity')}
            className="w-full border p-2 rounded"
          />
          {formik.touched.capacity && formik.errors.capacity && (
            <p className="text-red-500">{formik.errors.capacity}</p>
          )}
        </div>

        {/* Horario */}
        <div>
          <label className="block mb-1">Horario (Ej: 8:00 - 17:00)</label>
          <input
            type="text"
            {...formik.getFieldProps('schedule')}
            className="w-full border p-2 rounded"
          />
          {formik.touched.schedule && formik.errors.schedule && (
            <p className="text-red-500">{formik.errors.schedule}</p>
          )}
        </div>

        {/* Días */}
        <div>
          <label className="block mb-1">Días (Ej: Lunes a Viernes)</label>
          <input
            type="text"
            {...formik.getFieldProps('days')}
            className="w-full border p-2 rounded"
          />
          {formik.touched.days && formik.errors.days && (
            <p className="text-red-500">{formik.errors.days}</p>
          )}
        </div>

        {/* Tipo de Sala */}
        <div>
          <label className="block mb-1">Tipo</label>
          <select
            {...formik.getFieldProps('type')}
            onChange={handleTypeChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Seleccione un tipo</option>
            <option value="Musculación">Musculación</option>
            <option value="Funcional">Funcional</option>
          </select>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-500">{formik.errors.type}</p>
          )}
        </div>

        {/* Entrenador (Solo funcional) */}
        {isFunctional && (
          <div>
            <label className="block mb-1">Entrenador</label>
            <input
              type="text"
              {...formik.getFieldProps('trainer')}
              className="w-full border p-2 rounded"
            />
            {formik.touched.trainer && formik.errors.trainer && (
              <p className="text-red-500">{formik.errors.trainer}</p>
            )}
          </div>
        )}

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-tertiary text-white font-holtwood py-2 rounded hover:bg-orange-700 transition"
        >
          {roomToEdit ? 'Actualizar Sala' : 'Crear Sala'}
        </button>
      </form>
    </div>
  );
};

export default TrainingRoomForm;

'use client';

import { useFormik } from 'formik';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Toast } from '../Toast/Toast';
import { InputField } from '@/data/Imputfield';
import {
  TrainingRoomFormProps,
  TrainingRoomFormValues,
} from '@/interfaces/ITrainingRoom';
import { roomValidationSchema } from '@/helpers/RommsValidates';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const daysOfWeek = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

const TrainingRoomForm: React.FC<TrainingRoomFormProps> = ({ roomToEdit }) => {
  const { userData } = useAuth();
  const router = useRouter();
  const [isFunctional, setIsFunctional] = useState<boolean>(
    roomToEdit?.type === 'Funcional' || false
  );

  const formik = useFormik<TrainingRoomFormValues>({
    initialValues: {
      name: roomToEdit?.name || '',
      capacity: roomToEdit?.capacity || '',
      scheduleFrom: roomToEdit?.scheduleFrom || '',
      scheduleTo: roomToEdit?.scheduleTo || '',
      days: roomToEdit?.days || [], // Asignación corregida
      type: roomToEdit?.type || '',
      trainer: roomToEdit?.trainer || '',
    },
    validationSchema: roomValidationSchema,
    onSubmit: async (values) => {
      try {
        // Validación de roles (Descomentar cuando los roles estén activos)

        if (
          userData?.user.role !== 'USER_ADMIN' &&
          userData?.user.role !== 'USER_TRAINER'
        ) {
          Toast.fire({
            icon: 'error',
            title: 'No tienes permisos para esta acción.',
          });
          return;
        }

        // Preparar días como string separados por coma antes de enviar
        const body = {
          ...values,
          days: values.days.join(', '), // Convertimos array a string
          id: roomToEdit?.id, // Solo en modo edición
        };

        const method = roomToEdit ? 'PUT' : 'POST';
        const url = roomToEdit
          ? `${API_URL}/rooms/updateRoom`
          : `${API_URL}/rooms/register`;

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error('Error al guardar la sala');

        Toast.fire({
          icon: 'success',
          title: roomToEdit
            ? 'Sala actualizada con éxito'
            : 'Sala creada con éxito',
        });

        router.push('/admin/rooms');
      } catch (error) {
        console.error('Error al guardar la sala:', error);
        Toast.fire({ icon: 'error', title: 'Error al guardar la sala' });
      }
    },
  });

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'Musculación' | 'Funcional' | '';
    setIsFunctional(value === 'Funcional');
    formik.setFieldValue('type', value);
    if (value !== 'Funcional') formik.setFieldValue('trainer', '');
  };

  const handleDayChange = (day: string) => {
    const currentDays = formik.values.days;
    if (currentDays.includes(day)) {
      formik.setFieldValue(
        'days',
        currentDays.filter((d) => d !== day)
      );
    } else {
      formik.setFieldValue('days', [...currentDays, day]);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg whiteShadow max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-holtwood text-primary text-center mb-4">
        {roomToEdit ? 'Editar Sala' : 'Crear Sala de Entrenamiento'}
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4 text-primary">
        {/* Nombre */}
        <InputField
          label="Nombre de la Sala"
          name="name"
          formik={formik}
          className="border-tertiary  border-2 font-holtwood"
        />

        {/* Capacidad */}
        <InputField
          label="Capacidad (1-20 personas)"
          name="capacity"
          type="number"
          formik={formik}
          className="border-tertiary border-2 font-holtwood"
        />

        {/* Horarios */}
        <InputField
          label="Horario Desde (HH:mm)"
          name="scheduleFrom"
          type="time"
          formik={formik}
          className="border-tertiary border-2 font-holtwood"
        />
        <InputField
          label="Horario Hasta (HH:mm)"
          name="scheduleTo"
          type="time"
          formik={formik}
          className="border-tertiary border-2 font-holtwood"
        />

        {/* Días */}
        <div>
          <label className="block mb-1 font-bold font-holtwood">
            Días de la semana
          </label>
          <div className="grid grid-cols-2 gap-2 ">
            {daysOfWeek.map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={day}
                  checked={formik.values.days.includes(day)}
                  onChange={() => handleDayChange(day)}
                  className="h-4 w-4"
                />
                {day}
              </label>
            ))}
          </div>
          {formik.touched.days && formik.errors.days && (
            <p className="text-red-500 font-holtwood">
              {formik.errors.days as string}
            </p>
          )}
        </div>

        {/* Tipo */}
        <div>
          <label className="block mb-1 font-bold font-holtwood">Tipo</label>
          <select
            {...formik.getFieldProps('type')}
            onChange={handleTypeChange}
            className="w-full  p-2 rounded font-ibm"
          >
            <option value="">Seleccione un tipo</option>
            <option value="Musculación">Musculación</option>
            <option value="Funcional">Funcional</option>
          </select>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-500">{formik.errors.type}</p>
          )}
        </div>

        {/* Entrenador */}
        {isFunctional && (
          <InputField
            label="Entrenador"
            name="trainer"
            formik={formik}
            className="border-tertiary border-2 font-holtwood"
          />
        )}

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-tertiary border-2 text-white font-holtwood py-2 rounded hover:bg-orange-700 transition"
        >
          {roomToEdit ? 'Actualizar Sala' : 'Crear Sala'}
        </button>
      </form>
    </div>
  );
};

export default TrainingRoomForm;

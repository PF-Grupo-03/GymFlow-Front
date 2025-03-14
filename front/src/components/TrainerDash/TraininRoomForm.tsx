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
    roomToEdit?.type === 'FUNCIONAL' || false
  );

  const formik = useFormik<TrainingRoomFormValues>({
    initialValues: {
      name: roomToEdit?.name || '',
      capacity: roomToEdit?.capacity?.toString() || '',
      scheduleFrom: roomToEdit?.scheduleFrom || '',
      type:
        roomToEdit?.type === 'FUNCIONAL'
          ? 'Funcional'
          : roomToEdit?.type === 'MUSCULACION'
          ? 'Musculación'
          : '',
      trainer: roomToEdit?.trainer || '',
      day: roomToEdit?.day || '',
    },
    validationSchema: roomValidationSchema,
    onSubmit: async (values) => {
      try {
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

        const roomData = {
          name: values.name,
          capacity: parseInt(values.capacity, 10),
          day: values.day.toUpperCase(),
          time: values.scheduleFrom,
          type: values.type === 'Funcional' ? 'FUNCIONAL' : 'MUSCULACION',
          teacherId: isFunctional ? values.trainer : null,
          id: roomToEdit?.id,
        };

        const method = roomToEdit ? 'PUT' : 'POST';
        const url = roomToEdit
          ? `${API_URL}/rooms/updateRoom`
          : `${API_URL}/rooms/register`;

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData?.token.token}`,
          },
          body: JSON.stringify(roomData),
        });

        if (!response.ok) throw new Error('Error al guardar la sala');

        Toast.fire({
          icon: 'success',
          title: roomToEdit
            ? 'Sala actualizada con éxito'
            : 'Sala creada con éxito',
        });

        router.push('/Trainingrooms');
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

  return (
    <div className="bg-white p-8 rounded-lg whiteShadow max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-holtwood text-primary text-center mb-4">
        {roomToEdit ? 'Editar Sala' : 'Crear Sala de Entrenamiento'}
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4 text-primary">
        <InputField
          label="Nombre de la Sala"
          name="name"
          formik={formik}
          className="border-tertiary border-2 font-holtwood"
        />
        <InputField
          label="Capacidad (1-20 personas)"
          name="capacity"
          type="number"
          formik={formik}
          className="border-tertiary border-2 font-holtwood"
        />
        <InputField
          label="Horario (HH:mm)"
          name="scheduleFrom"
          type="time"
          formik={formik}
          className="border-tertiary border-2 font-holtwood"
        />

        <div>
          <label className="block mb-1 font-bold font-holtwood">
            Día de la semana
          </label>
          <select
            {...formik.getFieldProps('day')}
            className="w-full p-2 rounded font-ibm"
          >
            <option value="">Seleccione un día</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          {formik.touched.day && formik.errors.day && (
            <p className="text-red-500">{formik.errors.day}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-bold font-holtwood">Tipo</label>
          <select
            {...formik.getFieldProps('type')}
            onChange={handleTypeChange}
            className="w-full p-2 rounded font-ibm"
          >
            <option value="">Seleccione un tipo</option>
            <option value="Musculación">Musculación</option>
            <option value="Funcional">Funcional</option>
          </select>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-500">{formik.errors.type}</p>
          )}
        </div>

        {isFunctional && (
          <InputField
            label="Entrenador (ID)"
            name="trainer"
            formik={formik}
            className="border-tertiary border-2 font-holtwood"
          />
        )}

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

import * as Yup from 'yup';

// Días válidos
const validDays = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

export const roomValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es obligatorio'),

  capacity: Yup.number()
    .typeError('La capacidad debe ser un número')
    .min(1, 'La capacidad mínima es 1 persona')
    .max(20, 'La capacidad máxima es 20 personas')
    .required('La capacidad es obligatoria'),

  day: Yup.string()
    .oneOf(validDays, 'Selecciona un día válido')
    .required('El día es obligatorio'),

  scheduleFrom: Yup.string()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      'El horario debe tener formato HH:mm'
    )
    .required('El horario es obligatorio'),

  type: Yup.string()
    .oneOf(['Musculación', 'Funcional'], 'Selecciona un tipo válido')
    .required('El tipo es obligatorio'),

  trainer: Yup.string().when('type', {
    is: 'Funcional',
    then: (schema) =>
      schema.required('El entrenador es obligatorio para salas funcionales'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

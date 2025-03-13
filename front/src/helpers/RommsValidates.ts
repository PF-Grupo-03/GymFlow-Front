import * as Yup from 'yup';

// Validación de horario en formato HH:MM (24 horas)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Validación de días de la semana
const validDays = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

// Esquema de validación completo
export const roomValidationSchema = Yup.object({
  name: Yup.string().required('Nombre de sala requerido'),
  capacity: Yup.number()
    .required('Capacidad requerida')
    .min(1, 'La capacidad mínima es de 1 persona')
    .max(20, 'La capacidad máxima es de 20 personas')
    .integer('Debe ser un número entero'),
  scheduleFrom: Yup.string()
    .required('Horario de inicio requerido')
    .matches(timeRegex, 'Formato de hora no válido (HH:MM)'),
  scheduleTo: Yup.string()
    .required('Horario de fin requerido')
    .matches(timeRegex, 'Formato de hora no válido (HH:MM)'),
  days: Yup.array()
    .of(Yup.string().oneOf(validDays, 'Día no válido'))
    .min(1, 'Selecciona al menos un día')
    .required('Días de actividad requerido'),
  type: Yup.string()
    .oneOf(
      ['Musculación', 'Funcional'],
      'Tipo debe ser Musculación o Funcional'
    )
    .required('Tipo requerido'),
  trainer: Yup.string().test(
    'is-functional',
    'Nombre del entrenador requerido para salas funcionales',
    function (value) {
      const { type } = this.parent;
      if (type === 'Funcional') {
        return !!value?.trim();
      }
      return true;
    }
  ),
});

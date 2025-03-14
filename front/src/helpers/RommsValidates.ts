// helpers/RoomsValidates.ts
import * as Yup from 'yup';

export const roomValidationSchema = Yup.object({
  name: Yup.string().required('El nombre es obligatorio'),
  capacity: Yup.number()
    .typeError('Debe ser un número')
    .min(1, 'La capacidad mínima es 1')
    .max(20, 'La capacidad máxima es 20')
    .required('La capacidad es obligatoria'),
  day: Yup.string().required('El día es obligatorio'),
  scheduleFrom: Yup.string().required('El horario es obligatorio'),
  type: Yup.string()
    .oneOf(['Musculación', 'Funcional'], 'Tipo inválido')
    .required('El tipo es obligatorio'),
  trainer: Yup.string().when('type', {
    is: 'Funcional',
    then: (schema) => schema.required('El entrenador es obligatorio'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

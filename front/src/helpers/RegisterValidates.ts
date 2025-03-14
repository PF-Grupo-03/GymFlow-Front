import * as Yup from 'yup';

const RegisterValidates = Yup.object().shape({
  nameAndLastName: Yup.string()
    .min(3, 'El nombre es muy corto')
    .max(50, 'El nombre es muy largo')
    .required('Nombre completo obligatorio'),

  birthdate: Yup.date()
    .required('Fecha de nacimiento obligatoria')
    .max(new Date(), 'La fecha no puede ser en el futuro'),

  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('Correo obligatorio'),

  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('Contraseña obligatoria'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Las contraseñas deben coincidir')
    .required('Repetir la contraseña es obligatorio'),

  phone: Yup.string()
    .min(7, 'Número de teléfono muy corto')
    .max(15, 'Número de teléfono muy largo')
    .required('Teléfono obligatorio'),

  address: Yup.string()
    .min(5, 'Dirección muy corta')
    .max(100, 'Dirección muy larga')
    .required('Dirección obligatoria'),

  role: Yup.string()
    .oneOf(['USER_MEMBER', 'USER_TRAINING'], 'Rol inválido')
    .required('Rol obligatorio'),

  dni: Yup.string()
    .matches(/^\d{7,8}$/, 'DNI inválido')
    .required('DNI obligatorio'),
});

export default RegisterValidates;

import * as Yup from 'yup';

export const RegisterValidates = Yup.object().shape({
  nameAndLastName: Yup.string()
    .matches(/^\S+\s+\S+/, 'Debes ingresar nombre y apellido')
    .required('Campo requerido'),

  email: Yup.string().email('Correo inválido').required('Campo requerido'),

  password: Yup.string()
    .min(8, 'Mínimo 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener una mayúscula')
    .matches(/[a-z]/, 'Debe contener una minúscula')
    .matches(/[!@#$%^&*]/, 'Debe contener un carácter especial')
    .required('Campo requerido'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Campo requerido'),

  phone: Yup.string()
    .matches(/^\+\d{12}$/, 'Debe comenzar con "+" y tener 13 dígitos en total')
    .required('Campo requerido'),

  address: Yup.string().required('Campo requerido'),

  birthdate: Yup.date()
    .nullable()
    .required('Campo requerido')
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 12)),
      'Debes ser mayor de 12 años'
    ),

  role: Yup.string()
    .oneOf(['USER_MEMBER', 'USER_TRAINING'], 'Selecciona un rol válido')
    .required('Campo requerido'),

  dni: Yup.string()
    .matches(/^\d+$/, 'El DNI solo debe contener números')
    .min(7, 'El DNI debe tener al menos 7 dígitos')
    .max(8, 'El DNI no puede tener más de 8 dígitos')
    .required('El DNI es obligatorio'),
});

export default RegisterValidates;

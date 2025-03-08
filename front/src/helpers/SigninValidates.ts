import * as Yup from 'yup';

export const SigninValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email no válido')
    .required('El email es obligatorio'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es obligatoria'),
});

export default SigninValidationSchema;

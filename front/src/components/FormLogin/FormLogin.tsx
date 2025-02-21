'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Toast } from '../Toast/Toast';
import Link from 'next/link';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email no válido')
    .required('El email es obligatorio'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es obligatoria'),
});

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <div className="relative flex justify-center items-center min-h-screen h-[90vh] pb-8">
      <div className="absolute inset-0 bg-[url('/assets/image_login.png')] bg-cover bg-center before:absolute before:inset-0 before:bg-black/60"></div>

      <div className="relative bg-secondary p-12 w-[420px] h-[450px] rounded-2xl shadow-lg">
        <h2 className="text-primary text-3xl font-holtwood text-center mb-12">
          INICIAR SESIÓN
        </h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log('Inicio de sesión:', values);

            Toast.fire({
              icon: 'success',
              title: 'Inicio de sesión exitoso',
            });

            resetForm();
            router.push('/');
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="text-primary font-holtwood text-sm">
                  Email:
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full border-2 border-tertiary p-2 rounded-md"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="relative">
                <label className="text-primary font-holtwood text-sm">
                  Contraseña:
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="w-full border-2 border-tertiary p-2 rounded-md pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <button
                type="submit"
                className="bg-tertiary text-primary font-holtwood py-2 px-4 rounded-md hover:shadow-md transition"
                disabled={isSubmitting}
              >
                INICIAR SESIÓN
              </button>

              <p className="text-center text-sm text-primary font-ibm">
                ¿No tienes una cuenta?{' '}
                <Link
                  href="/Register"
                  className="text-orange-500 cursor-pointer"
                >
                  Regístrate
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormLogin;

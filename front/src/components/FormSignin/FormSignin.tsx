'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Cookies from 'js-cookie';
import SigninValidationSchema from '@/helpers/SigninValidates';
import { Signin } from '@/helpers/auth.helper';
import LoginGoogleButton from '../LoginGoogleButton/LoginGoogleButton';

const FormSignin = () => {
  const { setUserData } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false); // Estado para controlar que se monte en cliente
  const router = useRouter();

  // Se activa solo cuando el componente está montado en cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex justify-center items-center min-h-screen h-[90vh] -mt-5 pb-8">
      <div className="absolute inset-0 bg-[url('/assets/image_Signin.png')] bg-cover bg-center before:absolute before:inset-0 before:bg-black/60"></div>

      <div className="relative bg-secondary p-12 w-[420px] h-[450px] rounded-2xl shadow-lg mt-12">
        <h2 className="text-primary text-3xl font-holtwood text-center mb-12">
          INICIAR SESIÓN
        </h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SigninValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              // Paso 1: Realizar el Signin para obtener el token
              const response = await Signin(values);

              // Paso 2: Guardamos el token y hacemos la petición para obtener los datos del usuario
              const token = response.data.token;
              const user = response.data.token.withoutPasswordAndRole;

              // Paso 3: Guardamos los datos de sesión y del usuario
              const sessionData = {
                token: token,
                user,
              };
              console.log('Este es lo que mandamos al contexto:', sessionData);

              // Actualizamos el contexto, localStorage y las cookies
              setUserData(sessionData);
              localStorage.setItem('userSession', JSON.stringify(sessionData));
              Cookies.set('authToken', sessionData.token, { expires: 7 });

              // Redirigimos al usuario a la página principal
              router.push('/');
            } catch (error) {
              console.error('Signin failed:', error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              {/* Email */}
              <div>
                <label className="text-primary font-holtwood text-sm">
                  Email:
                </label>
                <Field
                  type="email"
                  name="email"
                  autoComplete="off" // Previene atributos dinámicos de extensiones
                  className="w-full border-2 border-tertiary p-2 rounded-md"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="text-primary font-holtwood text-sm">
                  Contraseña:
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="off" // Previene atributos dinámicos de extensiones
                    className="w-full border-2 border-tertiary p-2 rounded-md pr-10"
                  />
                  {/* Mostrar/Ocultar contraseña solo si está montado */}
                  {mounted && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  )}
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Botón de login */}
              <button
                type="submit"
                className="bg-tertiary text-primary font-holtwood py-2 px-4 rounded-md hover:shadow-md transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Iniciando...' : 'INICIAR SESIÓN'}
              </button>

              {/* Botón Google */}
              <LoginGoogleButton />

              {/* Link a registro */}
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

export default FormSignin;

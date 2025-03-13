'use client';
import { useState } from 'react';
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
  const router = useRouter();

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
                user, // Aquí guardas la información completa del usuario
              };
              console.log('Este es lo que mandamos al contexto:', sessionData);
              // Actualizamos el contexto, localStorage y las cookies
              setUserData(sessionData); // Actualiza el contexto
              localStorage.setItem('userSession', JSON.stringify(sessionData)); // Guarda en localStorage
              Cookies.set('authToken', sessionData.token, { expires: 7 }); // Guarda el token en cookies

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

              <LoginGoogleButton />

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

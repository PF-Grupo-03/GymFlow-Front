'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import loginValidationSchema from '@/helpers/LoginValidates';
import { Login } from '@/helpers/auth.helper';
import { useAuth } from '@/context/AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/app/config/envs';
import GoogleButton from '../GoogleButton/GoogleButton';

const FormLogin = () => {
  const { setUserData } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsExpanded(true);
  }, []);

  return (
    <div className="relative flex justify-center items-center min-h-screen h-[90vh] -mt-5 pb-8">
      <div className="absolute inset-0 bg-[url('/assets/image_login.png')] bg-cover bg-center before:absolute before:inset-0 before:bg-black/60"></div>

      <div
        className={`relative bg-secondary p-12 w-[420px] rounded-2xl shadow-lg mt-12 transition-all duration-300 ${
          isExpanded ? 'h-auto' : 'h-[450px]'
        }`}
      >
        <h2 className="text-primary text-3xl font-holtwood text-center mb-12">
          INICIAR SESIÓN
        </h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              const response = await Login(values);
              const token = response.data.token;
              const email = values.email;
              const userResponse = await axios.get(
                `${NEXT_PUBLIC_API_URL}/users/email/${email}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              const sessionData = {
                token: token,
                user: userResponse.data,
              };
              setUserData(sessionData);
              localStorage.setItem('userSession', JSON.stringify(sessionData));
              Cookies.set('authToken', sessionData.token, { expires: 7 });
              router.push('/');
            } catch (error) {
              console.error('Login failed:', error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form
              className="flex flex-col gap-4"
              onChange={() => setIsExpanded(true)}
            >
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
              <GoogleButton />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormLogin;

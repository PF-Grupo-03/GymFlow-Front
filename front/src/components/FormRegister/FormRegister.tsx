'use client';
import { useState } from 'react';
import RegisterValidates from '@/helpers/RegisterValidates';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { IRegister } from '@/interfaces/IRegister';
import { Register } from '@/helpers/auth.helper';
import { useRouter } from 'next/navigation';
import { Toast } from '../Toast/Toast';

const FormRegister = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative flex justify-center items-center min-h-screen -mt-5 pb-8">
      <div className="absolute inset-0 bg-[url('/assets/Register.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-black/60"></div>

      <div className="relative bg-secondary p-8 mt-12 rounded-2xl whiteShadow w-full max-w-xl">
        <h2 className="text-primary text-3xl font-holtwood text-center mb-6">
          REGISTRARSE
        </h2>

        <Formik
          initialValues={{
            nameAndLastName: '',
            birthdate: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            address: '',
            role: '',
            dni: '',
          }}
          validationSchema={RegisterValidates}
          onSubmit={async (values, { resetForm }) => {
            try {
              const userData: IRegister = {
                nameAndLastName: values.nameAndLastName,
                bDate: values.birthdate,
                email: values.email,
                password: values.password,
                phone: values.phone,
                confirmPassword: values.confirmPassword,
                address: values.address,
                role: values.role || 'USER_MEMBER',
                dni: values.dni,
              };

              await Register(userData);

              Toast.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: `Estas en GymFlow, Ahora inicia sesión ${values.nameAndLastName}!`,
              });

              resetForm();
              router.push("/Login"); 
            } catch (error) {
              console.error('Error en el registro:', error);
            }
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="flex flex-col gap-4">
              {/* Nombre y Apellido - Fecha de Nacimiento */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-primary font-holtwood text-sm">
                    Nombre y Apellido:
                  </label>
                  <Field
                    type="text"
                    name="nameAndLastName"
                    className="w-full border-2 border-tertiary p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="nameAndLastName"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div>
                  <label className="text-primary font-holtwood text-sm">
                    Fecha de Nacimiento:
                  </label>
                  <Field
                    type="date"
                    name="birthdate"
                    className="w-full border-2 border-tertiary p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="birthdate"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>

              {/* Rol - DNI */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-primary font-holtwood text-sm">
                    Rol:
                  </label>
                  <Field
                    as="select"
                    name="role"
                    className="w-full border-2 border-tertiary p-2 rounded-md"
                  >
                    <option value="">Elige tu rol</option>
                    <option value="USER_MEMBER">Cliente</option>
                    <option value="USER_TRAINING">Entrenador</option>
                  </Field>
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div>
                  <label className="text-primary font-holtwood text-sm">
                    DNI:
                  </label>
                  <Field
                    type="text"
                    name="dni"
                    className="w-full border-2 border-tertiary p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="dni"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>

              {/* Email (Ocupa todo el ancho) */}
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

              {/* Contraseña - Repetir Contraseña */}
              <div className="grid grid-cols-2 gap-4">
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

                <div className="relative">
                  <label className="text-primary font-holtwood text-sm">
                    Repetir Contraseña:
                  </label>
                  <div className="relative">
                    <Field
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      className="w-full border-2 border-tertiary p-2 rounded-md pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>

              {/* Teléfono - Dirección */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-primary font-holtwood text-sm">
                    Teléfono:
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    className="w-full border-2 border-tertiary p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div>
                  <label className="text-primary font-holtwood text-sm">
                    Dirección:
                  </label>
                  <Field
                    type="text"
                    name="address"
                    className="w-full border-2 border-tertiary p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`bg-tertiary text-primary font-holtwood py-2 px-4 rounded-md hover:shadow-md transition ${
                  !isValid ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!isValid || isSubmitting}
              >
                REGISTRARSE
              </button>

              <p className="text-center text-sm text-primary font-ibm">
                ¿Ya tienes una cuenta?{' '}
                <Link href="/Login" className="text-orange-500 cursor-pointer">
                  Inicia sesión
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormRegister;
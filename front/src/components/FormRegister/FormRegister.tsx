'use client';
import RegisterValidates from '@/helpers/RegisterValidates';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Toast } from '../Toast/Toast';

const FormRegister = () => {
  return (
    <div className="relative flex justify-center items-center min-h-screen mb-8">
      <div className="absolute inset-0 bg-[url('/assets/Register.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-black/60"></div>

      <div className="relative bg-secondary p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <h2 className="text-primary text-3xl font-holtwood text-center mb-6">
          REGISTRARSE
        </h2>

        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            address: '',
          }}
          validationSchema={RegisterValidates}
          onSubmit={(values, { resetForm }) => {
            console.log('Formulario enviado:', values);

            Toast.fire({
              icon: 'success',
              title: 'Registro exitoso',
              text: `Bienvenido, ${values.fullName}!`,
            });

            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-primary font-holtwood text-sm">
                    Nombre y Apellido:
                  </label>
                  <Field
                    type="text"
                    name="fullName"
                    className="w-full border-2 border-tertiary p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-primary font-holtwood text-sm">
                    Contraseña:
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full border-2 border-tertiary p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div>
                  <label className="text-primary font-holtwood text-sm">
                    Repetir Contraseña:
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="w-full border-2 border-tertiary p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>

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
                className="bg-tertiary text-primary font-holtwood py-2 px-4 rounded-md hover:shadow-md transition"
                disabled={isSubmitting}
              >
                REGISTRARSE
              </button>

              <p className="text-center text-sm text-primary font-ibm">
                ¿Ya tienes una cuenta?{' '}
                <span className="text-orange-500 cursor-pointer">
                  Inicia Sesión
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormRegister;

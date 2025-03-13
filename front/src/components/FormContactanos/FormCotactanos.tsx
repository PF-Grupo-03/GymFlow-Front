'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useFetch } from '@/Utils/hooks/useFetch';
import { sendEmail } from '@/Utils/services/apiServices';

import { Toast } from '@/components/Toast/Toast';
import * as Yup from 'yup';
import { getContactEmailTemplate } from '@/Utils/TemplatesEmail/contactEmail';


export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  const { loading, error, fetchData: sendEmailRequest } = useFetch(sendEmail);

  const onSubmit = async (
    values: ContactFormValues, 
    { resetForm }: FormikHelpers<ContactFormValues>
  ) => {
    try {
      if (loading) {
        Toast.fire({
          icon: 'info',
          title: 'Enviando mensaje',
          text: 'Por favor, espera...',
        });
      }
      if (error) {
        Toast.fire({
          icon: 'error',
          title: 'Error al enviar el mensaje',
          text: 'Inténtalo de nuevo más tarde.',
        });
      }
      
    
      const recipientEmail = 'proyecto.final.g03@gmail.com';
      
    
      const htmlTemplate = getContactEmailTemplate(values.name, values.email, values.message);
      
    
      await sendEmailRequest(recipientEmail, 'GymFlow - Nuevo mensaje de contacto', htmlTemplate, 'CONTACT_EVENT');
      
      Toast.fire({
        icon: 'success',
        title: 'Mensaje enviado',
        text: 'Gracias por contactarnos. Te responderemos pronto.',
      });
      
      resetForm();
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen -mt-5 pb-8">
      <div className="relative bg-secondary p-8 mt-12 rounded-2xl whiteShadow w-full max-w-xl">
        <h2 className="text-primary text-3xl font-holtwood text-center mb-6">CONTACTANOS</h2>
        
        <Formik
          initialValues={{
            name: '',
            email: '',
            message: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
            message: Yup.string().required('El mensaje es obligatorio'),
          })}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="text-primary font-holtwood text-sm">Nombre:</label>
                <Field type="text" name="name" className="w-full border-2 border-tertiary p-2 rounded-md" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
              </div>
              
              <div>
                <label className="text-primary font-holtwood text-sm">Email:</label>
                <Field type="email" name="email" className="w-full border-2 border-tertiary p-2 rounded-md" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
              </div>
              
              <div>
                <label className="text-primary font-holtwood text-sm">Mensaje:</label>
                <Field as="textarea" name="message" className="w-full border-2 border-tertiary p-2 rounded-md h-32" />
                <ErrorMessage name="message" component="div" className="text-red-500 text-xs" />
              </div>
              
              <button
                type="submit"
                className={`bg-tertiary text-primary font-holtwood py-2 px-4 rounded-md hover:shadow-md transition ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isValid || isSubmitting}
              >
                ENVIAR MENSAJE
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;

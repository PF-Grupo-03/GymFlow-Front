'use client';
import { TrainingRoomFormValues } from '@/interfaces/ITrainingRoom';
import { useFormik } from 'formik';

export const InputField = ({
  label,
  name,
  type = 'text',
  formik,
  className = '', // Definir un valor por defecto para className
}: {
  label: string;
  name: keyof TrainingRoomFormValues;
  type?: string;
  formik: ReturnType<typeof useFormik<TrainingRoomFormValues>>;
  className?: string;
}) => (
  <div>
    <label className="block mb-1">{label}</label>
    <input
      type={type}
      {...formik.getFieldProps(name)}
      className={`w-full border p-2 rounded ${className}`} // Usar className aquí
    />
    {formik.touched[name] && formik.errors[name] && (
      <p className="text-red-500">{formik.errors[name]}</p>
    )}
  </div>
);

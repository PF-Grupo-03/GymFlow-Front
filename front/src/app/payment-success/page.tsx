'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Función para obtener el nombre del plan según el monto
const getPlanName = (amount: number): string => {
  switch (amount) {
    case 18000:
      return 'Básico';
    case 30000:
      return 'Premium';
    case 50000:
      return 'Diamond';
    default:
      return 'Desconocido';
  }
};

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const paymentType = searchParams.get('payment_type');

  // Obtén el email del usuario desde el contexto de autenticación
  const { userEmail, setUserData } = useAuth();

  // Estado para guardar el monto del plan
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (paymentId && status === 'approved' && userEmail) {
      // Obtener el monto del plan desde localStorage
      const storedAmount =
        Number(localStorage.getItem('selectedPlanAmount')) || 0;

      // Guardar el monto en el estado
      setAmount(storedAmount);

      // Limpiar el monto guardado en localStorage
      localStorage.removeItem('selectedPlanAmount');

      // Datos que se enviarán al backend
      const paymentData = {
        paymentId,
        status,
        amount: storedAmount, // Usar el monto almacenado
        userEmail,
      };

      console.log('📦 Datos enviados al backend:', paymentData);

      // Procesar el pago en el backend
      fetch('http://localhost:3001/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log('Pago procesado en backend:', data);

          // Obtener la información actualizada del usuario desde el backend
          const userResponse = await fetch(
            `http://localhost:3001/users/email/${userEmail}`
          );
          const userData = await userResponse.json();

          // Actualizar el localStorage con la información actualizada del usuario
          if (userData) {
            localStorage.setItem('userSession', JSON.stringify(userData));
            setUserData(userData); // Actualizar el estado global del usuario
          }
        })
        .catch((error) => console.error('Error al procesar el pago:', error));
    }
  }, [paymentId, status, userEmail, setUserData]);

  // Obtener el nombre del plan usando el monto guardado en el estado
  const planName = getPlanName(amount);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-green-900 p-6">
      <CheckCircle className="w-16 h-16 text-tertiary" />
      <h1 className="text-3xl text-tertiary font-holtwood mt-4">
        ¡Pago Exitoso! 🎉
      </h1>
      <p className="text-lg text-white text-ibm mt-2">
        Tu pago ha sido procesado correctamente.
      </p>

      <div className="bg-secondary whiteShadow text-black text-ibm rounded-lg p-4 mt-4">
        <p>
          <strong>ID de Pago:</strong> {paymentId || 'No disponible'}
        </p>
        <p>
          <strong>Estado:</strong> {status || 'Desconocido'}
        </p>
        <p>
          <strong>Método de Pago:</strong> {paymentType || 'No especificado'}
        </p>
        <p>
          <strong>Plan:</strong> {planName} {/* Mostrar el nombre del plan */}
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 bg-tertiary text-white font-odor py-2 px-4 rounded-md hover:bg-tertiary transition"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}

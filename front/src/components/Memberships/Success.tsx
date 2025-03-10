'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const getPlanName = (amount: number): string => {
  switch (amount) {
    case 1:
      return 'Básico';
    case 2:
      return 'Premium';
    case 3:
      return 'Diamond';
    default:
      return 'Desconocido';
  }
};

export default function Success() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const paymentType = searchParams.get('payment_type');

  const { userEmail, setUserData } = useAuth();
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (paymentId && status === 'approved' && userEmail) {
      const storedAmount =
        Number(localStorage.getItem('selectedPlanAmount')) || 0;

      setAmount(storedAmount);
      localStorage.removeItem('selectedPlanAmount');

      console.log('📦 ID de Pago:', paymentId);
      console.log('📦 Estado:', status);

      // Obtener la información actualizada del usuario desde el backend
      fetch(`http://localhost:3001/users/email/${userEmail}`)
        .then((res) => res.json())
        .then((userData) => {
          if (userData) {
            localStorage.setItem('userSession', JSON.stringify(userData));
            setUserData(userData);
          }
        })
        .catch((error) =>
          console.error('Error al obtener la información del usuario:', error)
        );
    }
  }, [paymentId, status, userEmail, setUserData]);

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
          <strong>Plan:</strong> {planName}
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

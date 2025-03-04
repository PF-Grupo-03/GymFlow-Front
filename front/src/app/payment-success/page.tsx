'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const paymentType = searchParams.get('payment_type');

  useEffect(() => {
    if (paymentId && status === 'approved') {
      fetch('http://localhost:3001/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId }),
      })
        .then((res) => res.json())
        .then((data) => console.log('Pago procesado en backend:', data))
        .catch((error) => console.error('Error al procesar el pago:', error));
    }
  }, [paymentId, status]);

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

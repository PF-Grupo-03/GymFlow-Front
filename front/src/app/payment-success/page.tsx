'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const paymentType = searchParams.get('payment_type');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-green-900 p-6">
      <CheckCircle className="w-16 h-16 text-green-600" />
      <h1 className="text-3xl font-bold mt-4">¡Pago Exitoso! 🎉</h1>
      <p className="text-lg mt-2">Tu pago ha sido procesado correctamente.</p>

      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
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
        className="mt-6 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}

'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function Failure() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-red-900 p-6">
      <XCircle className="w-16 h-16 text-red-500" />
      <h1 className="text-3xl text-red-500 font-holtwood mt-4">
        Pago Fallido ❌
      </h1>
      <p className="text-lg text-white text-ibm mt-2">
        Hubo un problema al procesar tu pago. Inténtalo nuevamente.
      </p>

      <div className="bg-secondary whiteShadow text-black text-ibm rounded-lg p-4 mt-4">
        <p>
          <strong>ID de Pago:</strong> {paymentId || 'No disponible'}
        </p>
        <p>
          <strong>Estado:</strong> {status || 'Desconocido'}
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

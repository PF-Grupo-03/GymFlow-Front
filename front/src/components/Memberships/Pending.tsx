'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Clock } from 'lucide-react';

export default function Pending() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-yellow-900 p-6">
      <Clock className="w-16 h-16 text-tertiary" />
      <h1 className="text-3xl text-tertiary font-holtwood mt-4">
        Pago Pendiente ⏳
      </h1>
      <p className="text-lg text-white text-ibm mt-2">
        Tu pago está en proceso. Una vez aprobado, recibirás una confirmación.
      </p>

      <div className="bg-secondary whiteShadow text-black text-ibm rounded-lg p-4 mt-4">
        <p>
          <strong>ID de Pago:</strong> {paymentId || 'No disponible'}
        </p>
        <p>
          <strong>Estado:</strong> {status || 'Pendiente'}
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 bg-tertiary text-white font-odor py-2 px-4 rounded-md hover:bg-yellow-600 transition"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}

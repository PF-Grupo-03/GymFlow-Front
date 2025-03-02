'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Clock } from 'lucide-react';

export default function PaymentPending() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 text-yellow-900 p-6">
      <Clock className="w-16 h-16 text-yellow-600" />
      <h1 className="text-3xl font-bold mt-4">Pago Pendiente ⏳</h1>
      <p className="text-lg mt-2">
        Estamos procesando tu pago, esto puede tardar unos minutos.
      </p>

      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        <p>
          <strong>Estado:</strong> {status || 'En revisión'}
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}

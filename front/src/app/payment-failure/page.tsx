'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function PaymentFailure() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-900 p-6">
      <XCircle className="w-16 h-16 text-red-600" />
      <h1 className="text-3xl font-bold mt-4">¡Pago Fallido! ❌</h1>
      <p className="text-lg mt-2">Hubo un problema al procesar tu pago.</p>

      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        <p>
          <strong>Estado:</strong> {status || 'Desconocido'}
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}

'use client';

import PaymentForm from '@/components/Payment/PaymentForm';
import { useSearchParams } from 'next/navigation';

export default function Pago() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount'); // Obtenemos el valor de amount de la URL

  // Verificamos si 'amount' existe y es un número válido
  const parsedAmount = amount ? Number(amount) : 0;

  return (
    <div>
      <h1>Realizar Pago</h1>
      {/* Pasamos el amount al componente PaymentForm */}
      <PaymentForm amount={parsedAmount} />
    </div>
  );
}

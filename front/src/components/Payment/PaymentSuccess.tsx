'use client';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const description = searchParams.get('description');
  const email = searchParams.get('email');
  const paymentId = searchParams.get('paymentId');

  return (
    <div>
      <h2>Pago Exitoso</h2>
      <p>Monto: ${amount}</p>
      <p>Descripción: {description}</p>
      <p>Email del pagador: {email}</p>
      <p>ID de la transacción: {paymentId}</p>
    </div>
  );
}

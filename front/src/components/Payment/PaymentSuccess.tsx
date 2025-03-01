'use client';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const description = searchParams.get('description');
  const email = searchParams.get('email');
  const paymentId = searchParams.get('paymentId');

  // Función para determinar el tipo de membresía según el monto
  const getMembershipType = (amount: number) => {
    if (amount === 18000) {
      return 'Membresía Básica';
    } else if (amount === 30000) {
      return 'Membresía Premium';
    } else if (amount === 50000) {
      return 'Membresía Diamond';
    } else {
      return 'Membresía Desconocida';
    }
  };

  const membershipType = amount
    ? getMembershipType(Number(amount))
    : 'Membresía Desconocida';

  return (
    <div>
      <h2>Pago Exitoso</h2>
      <p>Monto: ${amount}</p>
      <p>Descripción: {description}</p>
      <p>Email del pagador: {email}</p>
      <p>ID de la transacción: {paymentId}</p>
      <h3>Tipo de Membresía: {membershipType}</h3>
    </div>
  );
}

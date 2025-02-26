'use client';
import CheckoutForm from '@/components/Payment/CheckoutForm';
import { useRouter } from 'next/navigation';

export default function CheckoutView() {
  const router = useRouter();

  const handlePaymentSuccess = () => {
    router.push('/success'); // Redirige a una página de éxito
  };

  return (
    <div>
      <h1>Pagar Membresía</h1>
      <CheckoutForm onPaymentSuccess={handlePaymentSuccess} />
    </div>
  );
}

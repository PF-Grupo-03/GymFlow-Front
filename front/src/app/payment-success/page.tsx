import Success from '@/components/Memberships/Success';
import { Suspense } from 'react';

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Success />
    </Suspense>
  );
}

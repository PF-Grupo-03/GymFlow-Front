'use client';

import CustomPaymentForm from '@/components/Payment/CustomPaymentForm';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const queryAmount = searchParams.get('amount');
    if (queryAmount) {
      setAmount(parseFloat(queryAmount));
    } else {
      router.push('/plans'); // Redirige si no hay un monto válido
    }
  }, [searchParams, router]);

  return (
    <div className="text-center bg-primary">
      <div className="inline-block items-center bg-tertiary px-8 py-3 rounded-lg orangeShadow mt-6">
        <h2 className="text-3xl font-bold font-holtwood text-primary tracking-wider">
          PAGAR MEMBRESÍA
        </h2>
      </div>
      {amount > 0 ? (
        <CustomPaymentForm amount={amount} />
      ) : (
        <p className="text-center text-red-500">Cargando...</p>
      )}
    </div>
  );
}

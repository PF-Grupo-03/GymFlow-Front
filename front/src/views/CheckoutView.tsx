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
    <>
      <div className="flex justify-center items-center mt-5 font-holtwood">
        <div
          className={`bg-tertiary rounded-tl-lg rounded-br-lg orangeShadow p-6 w-3/6 flex justify-center items-center mt-5`}
        >
          <span className="text-primary text-4xl">Pagar Membresía</span>
        </div>
      </div>
      {amount > 0 ? (
        <CustomPaymentForm amount={amount} />
      ) : (
        <p className="text-center text-red-500">Cargando...</p>
      )}
    </>
  );
}

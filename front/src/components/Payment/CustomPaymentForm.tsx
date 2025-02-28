'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Toast } from '../Toast/Toast';

export default function CustomPaymentForm() {
  const { userData } = useAuth();
  const [paymentToken, setPaymentToken] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Inicializa MercadoPago con la PUBLIC_KEY de prueba
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!, {
      locale: 'es-AR',
    });
  }, []);

  useEffect(() => {
    const queryAmount = searchParams.get('amount');
    if (queryAmount) {
      setAmount(parseFloat(queryAmount));
    } else {
      router.push('/Plans'); // Redirige si no hay un monto válido
    }
  }, [searchParams, router]);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isProcessing) return;

    if (!paymentToken) {
      Toast.fire({
        icon: 'error',
        title: 'Por favor, ingresa los datos de la tarjeta.',
      });
      return;
    }

    setIsProcessing(true);

    const paymentData = {
      description: 'Pago de Membresía',
      transactionAmount: amount,
      paymentMethodId,
      token: paymentToken,
      payerEmail: userData?.user?.email || '',
    };

    try {
      console.log('🔵 Enviando datos de pago a backend...', paymentData);

      const response = await axios.post(
        'http://localhost:3001/api/payment',
        paymentData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log('🟡 Respuesta del backend:', response);

      Toast.fire({ icon: 'success', title: 'Pago registrado exitosamente.' });

      // router.push(
      //   `/Payment-success?amount=${paymentData.transactionAmount}&description=${paymentData.description}&email=${paymentData.payerEmail}&paymentId=${data.id}`
      // );
    } catch (error: any) {
      console.error(
        '🔴 Error en el pago:',
        error.response?.data || error.message
      );
      Toast.fire({
        icon: 'error',
        title: error.response?.data?.message || 'Error en el pago',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <h2>Formulario de Pago</h2>
      <CardPayment
        initialization={{ amount }}
        onReady={() => console.log('✅ Secure Fields ready')}
        onError={(error) => console.error('🔴 Secure Fields error:', error)}
        onSubmit={async (formData) => {
          console.log('✅ Token generado:', formData.token);
          setPaymentToken(formData.token);
          setPaymentMethodId(formData.payment_method_id);
        }}
      />
      <button onClick={handlePayment} disabled={isProcessing}>
        {isProcessing ? 'Procesando...' : 'Pagar'}
      </button>
    </div>
  );
}

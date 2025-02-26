import { useState } from 'react';
import { CardPayment } from '@mercadopago/sdk-react';
import useMercadoPago from '@/hooks/useMercadoPago';

interface CheckoutFormProps {
  onPaymentSuccess: () => void;
}

export default function CheckoutForm({ onPaymentSuccess }: CheckoutFormProps) {
  const mercadoPagoReady = useMercadoPago();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const handleSubmit = async (formData: any) => {
    const response = await fetch('/api/process-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    setPaymentStatus(result.status);

    if (result.status === 'approved') {
      onPaymentSuccess();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary mb-8">
      <div className="max-w-lg w-full bg-secondary p-6 whiteShadow mt-8 rounded-lg">
        <h2 className="text-2xl font-holtwood text-center mb-4">
          Completá tu pago
        </h2>

        {mercadoPagoReady ? (
          <CardPayment
            initialization={{ amount: 1000 }}
            onSubmit={handleSubmit}
          />
        ) : (
          <p className="text-center text-gray-500">Cargando MercadoPago...</p>
        )}

        {paymentStatus && (
          <p className="text-center mt-4 font-semibold text-lg text-green-600">
            Estado del pago: {paymentStatus}
          </p>
        )}
      </div>
    </div>
  );
}

'use client';
import CheckoutBrick from '@/components/Payment/CheckoutBricks';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null); // Nuevo estado para el monto
  const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;

  useEffect(() => {
    const createPreference = async () => {
      try {
        const response = await fetch('/api/payments/create-preference', {
          method: 'POST',
        });

        if (!response.ok)
          throw new Error('Error al obtener la preferencia de pago');

        const data = await response.json();
        setPreferenceId(data.preferenceId);

        // Suponiendo que el backend también te devuelve el monto, lo puedes setear aquí
        setAmount(data.amount); // Asumiendo que el backend devuelve el monto en la respuesta
      } catch (error) {
        console.error('❌ Error al crear la preferencia:', error);
      }
    };

    createPreference();
  }, []);

  if (!publicKey) {
    return <div>❌ Error: Clave pública no configurada</div>;
  }

  // Verificar si el monto está disponible antes de renderizar el componente CheckoutBrick
  return (
    <div>
      <h1>Pagar con MercadoPago</h1>
      {preferenceId && amount ? (
        <CheckoutBrick
          publicKey={publicKey}
          preferenceId={preferenceId}
          amount={amount}
        />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

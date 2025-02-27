'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface CustomPaymentFormProps {
  amount: number;
}

export default function CustomPaymentForm({ amount }: CustomPaymentFormProps) {
  const { isAuthenticated, userData } = useAuth();
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [payerEmail, setPayerEmail] = useState(userData?.user?.email || '');
  const [payerDni, setPayerDni] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('Debes iniciar sesión para comprar una membresía.');
      return;
    }

    if (!payerEmail || !payerDni || !cardNumber || !expiration || !cvv) {
      alert('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);

    const paymentData = {
      transaction_amount: amount,
      card_number: cardNumber,
      expiration_date: expiration,
      security_code: cvv,
      payer: {
        email: payerEmail,
        identification: {
          type: 'DNI',
          number: payerDni,
        },
      },
    };

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      if (result.status === 'approved') {
        router.push('/success');
      } else {
        alert('Error en el pago: ' + result.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Hubo un problema con el pago.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg whiteShadow">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 mt-6">
          Completá tu pago
        </h2>

        {isAuthenticated ? (
          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label
                htmlFor="payerEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Correo del Pagador
              </label>
              <input
                id="payerEmail"
                type="email"
                placeholder="ejemplo@email.com"
                value={payerEmail}
                onChange={(e) => setPayerEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="payerDni"
                className="block text-sm font-medium text-gray-700"
              >
                Número de DNI
              </label>
              <input
                id="payerDni"
                type="text"
                placeholder="Ej: 12345678"
                value={payerDni}
                onChange={(e) => setPayerDni(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Número de Tarjeta
              </label>
              <input
                id="cardNumber"
                type="text"
                placeholder="**** **** **** ****"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>

            {/* Expiración y CVV */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="expiration"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de Expiración (MM/YY)
                </label>
                <input
                  id="expiration"
                  type="text"
                  placeholder="MM/YY"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código de Seguridad (CVV)
                </label>
                <input
                  id="cvv"
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg transition disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? 'Procesando...' : `Pagar $${amount}`}
            </button>
          </form>
        ) : (
          <p className="text-center text-red-500">Debes iniciar sesión.</p>
        )}
      </div>
    </div>
  );
}

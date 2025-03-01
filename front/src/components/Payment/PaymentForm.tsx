'use client';

import { useState } from 'react';
import axios from 'axios';
import { useMercadoPago } from '@/context/MercadoPagocontext';
import { useAuth } from '@/context/AuthContext';
import { Toast } from '../Toast/Toast';
import { useRouter } from 'next/navigation';

interface PaymentFormProps {
  amount: number;
}

export default function PaymentForm({ amount }: PaymentFormProps) {
  const { mercadoPago } = useMercadoPago();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpirationMonth, setCardExpirationMonth] = useState('');
  const [cardExpirationYear, setCardExpirationYear] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  if (!isAuthenticated) {
    Toast.fire({ icon: 'error', title: 'Debes iniciar sesión para pagar.' });
    router.push('/Login');
    return null;
  }

  const handleCardNumberChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const cardNum = e.target.value;
    setCardNumber(cardNum);
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mercadoPago) {
      Toast.fire({
        icon: 'error',
        title: 'MercadoPago aún no está disponible. Intenta nuevamente.',
      });
      return;
    }

    if (!mercadoPago.cardToken) {
      console.error('❌ Error: `mercadoPago.cardToken` no está disponible.');
      Toast.fire({
        icon: 'error',
        title: 'Error al procesar el pago. `cardToken` no está disponible.',
      });
      return;
    }

    try {
      const { id: token } = await mercadoPago.cardToken.create({
        cardNumber,
        cardExpirationMonth,
        cardExpirationYear,
        securityCode,
        cardholderName,
        identificationType: 'DNI',
        identificationNumber: '12345678',
      });

      console.log('✅ Token generado correctamente:', token);

      const response = await axios.post('http://localhost:3001/payment', {
        description: 'Pago de Membresía',
        transactionAmount: amount,
        paymentMethodId: selectedPaymentMethod,
        token,
        payerEmail,
      });

      Toast.fire({
        icon: 'success',
        title: `Pago exitoso. ID: ${response.data.paymentId}`,
      });

      router.push(
        `/PaymentSuccess?amount=${amount}&email=${payerEmail}&paymentId=${response.data.paymentId}`
      );
    } catch (error) {
      let errorMessage = 'Ocurrió un error inesperado.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('❌ Error en el pago:', errorMessage);
      Toast.fire({
        icon: 'error',
        title: 'Error al procesar el pago.',
        text: errorMessage,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Completa los datos de pago
      </h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-gray-600 text-sm">
            Nombre del titular
          </label>
          <input
            type="text"
            placeholder="Nombre del titular"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm">
            Número de tarjeta
          </label>
          <input
            type="text"
            placeholder="Número de tarjeta"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 text-sm">
              Mes de expiración
            </label>
            <input
              type="text"
              placeholder="MM"
              value={cardExpirationMonth}
              onChange={(e) => setCardExpirationMonth(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm">
              Año de expiración
            </label>
            <input
              type="text"
              placeholder="YY"
              value={cardExpirationYear}
              onChange={(e) => setCardExpirationYear(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-600 text-sm">
            Código de seguridad
          </label>
          <input
            type="text"
            placeholder="CVV"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm">
            Correo electrónico
          </label>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={payerEmail}
            onChange={(e) => setPayerEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {paymentMethods.length > 0 && (
          <div>
            <label className="block text-gray-600 text-sm">
              Método de pago
            </label>
            <select
              onChange={handlePaymentMethodChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione método de pago</option>
              {paymentMethods.map((pm) => (
                <option key={pm.id} value={pm.id}>
                  {pm.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
        >
          Pagar
        </button>
      </div>
    </form>
  );
}

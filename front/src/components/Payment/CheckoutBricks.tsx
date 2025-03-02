'use client';
import { useEffect, useRef } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';

interface CheckoutBrickProps {
  publicKey: string;
  preferenceId: string;
  amount: number;
}

const CheckoutBrickComponent: React.FC<CheckoutBrickProps> = ({
  publicKey,
  preferenceId,
  amount,
}) => {
  const checkoutContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!publicKey || !preferenceId || !amount) {
      console.error('❌ Error: Datos de pago incompletos.');
      return;
    }

    // Inicializa MercadoPago con la clave pública
    initMercadoPago(publicKey, { locale: 'es-AR' });

    const renderCheckout = () => {
      if (checkoutContainer.current) {
        try {
          // Configura el brick en el contenedor, este es un ejemplo
          const bricksBuilder = new window.MercadoPago.Checkout({
            initialization: {
              preferenceId, // ID de la preferencia
              amount, // Monto obligatorio
            },
            customization: {
              visual: {
                hidePaymentButton: false, // Mostrar el botón de pago
              },
              paymentMethods: {
                maxInstallments: 1, // Máximo número de cuotas
              },
            },
            callbacks: {
              onReady: () => console.log('✅ Checkout Brick listo'),
              onError: (error: unknown) =>
                console.error('❌ Error en el pago:', error),
            },
          });

          bricksBuilder.mount(checkoutContainer.current); // Monta el brick en el contenedor
        } catch (error) {
          console.error('❌ Error al renderizar el Checkout Brick:', error);
        }
      }
    };

    renderCheckout();
  }, [publicKey, preferenceId, amount]);

  return <div ref={checkoutContainer}></div>;
};

export default CheckoutBrickComponent;

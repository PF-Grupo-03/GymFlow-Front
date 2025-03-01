'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Script from 'next/script';

interface MercadoPagoContextType {
  mercadoPago: any;
}

const MercadoPagoContext = createContext<MercadoPagoContextType | undefined>(
  undefined
);

export function MercadoPagoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mercadoPago, setMercadoPago] = useState<any>(null);

  useEffect(() => {
    if (window && window.MercadoPago) {
      const mpInstance = new window.MercadoPago(
        process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!,
        {
          locale: 'es-AR',
        }
      );

      console.log('MercadoPago SDK cargado:', mpInstance);
      console.log(
        '¿`cardToken` está disponible?',
        mpInstance.cardToken ? 'Sí' : 'No'
      ); // Verifica si `cardToken` existe

      setMercadoPago(mpInstance);
    } else {
      console.error('❌ Error: MercadoPago no se pudo cargar.');
    }
  }, []);

  return (
    <>
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        strategy="afterInteractive"
        onLoad={() => console.log('MercadoPago SDK cargado')}
      />
      <MercadoPagoContext.Provider value={{ mercadoPago }}>
        {children}
      </MercadoPagoContext.Provider>
    </>
  );
}

export function useMercadoPago() {
  const context = useContext(MercadoPagoContext);
  if (!context) {
    throw new Error(
      'useMercadoPago debe usarse dentro de un MercadoPagoProvider'
    );
  }
  return context;
}

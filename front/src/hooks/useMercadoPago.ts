import { useEffect, useState } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';

export default function useMercadoPago() {
  const [mercadoPagoReady, setMercadoPagoReady] = useState(false);

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY || '', {
      locale: 'es-AR',
    });
    setMercadoPagoReady(true);
  }, []);

  return mercadoPagoReady;
}

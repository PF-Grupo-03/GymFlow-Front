'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Para redirigir al usuario
import TitleBox from '../TitleBox/TitleBox';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { ChevronsRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Toast } from '../Toast/Toast';

initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY, {
  locale: 'es-AR',
});

interface Plan {
  title: string;
  price: number;
  benefits: string[];
}

const plans: Plan[] = [
  {
    title: 'Plan Básico',
    price: 18000,
    benefits: [
      'Acceso al Gimnasio',
      'Reserva de turnos de musculación de 8:00 a 18:00hrs',
      'Asistencia Pasiva',
      'Registro de avances',
    ],
  },
  {
    title: 'Plan Premium',
    price: 30000,
    benefits: [
      'Acceso al Gimnasio',
      'Reserva de turnos de musculación las 24hrs',
      'Reserva de turnos de clases las 24hrs',
      'Asistencia Pasiva',
      'Registro de avances',
      'Plan de entrenamiento',
    ],
  },
  {
    title: 'Plan Diamond',
    price: 50000,
    benefits: [
      'Acceso al Gimnasio',
      'Reserva de turnos las de musculación las 24hrs',
      'Reserva de turnos de clases las 24hrs',
      'Asistencia Activa',
      'Registro de avances',
      'Plan de entrenamiento',
      'Plan dietético',
    ],
  },
];

export default function Memberships() {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const { isAuthenticated, userId, userEmail } = useAuth(); // Obtén el estado de autenticación, userId y userEmail
  const router = useRouter(); // Redirigir al usuario si no está autenticado

  const handleCreatePreference = async (plan: Plan) => {
    if (!isAuthenticated) {
      Toast.fire({
        icon: 'warning',
        title: 'Para elegir un plan, debes iniciar sesión.',
      });
      router.push('/Login');
      return;
    }

    try {
      console.log('📌 Enviando solicitud para crear preferencia');
      console.log('📦 Datos enviados al backend:', {
        title: plan.title,
        price: plan.price,
        userId: userId,
        userEmail: userEmail,
      });

      const response = await fetch('http://localhost:3001/payment/preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: plan.title,
          price: plan.price,
          userId: userId,
          userEmail: userEmail,
        }),
      });

      console.log('🔍 Respuesta completa del servidor:', response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error en la respuesta del backend:', errorText);
        throw new Error('Error al crear la preferencia: ' + errorText);
      }

      const data = await response.json();
      console.log('✅ Respuesta parseada:', data);

      if (data && data.preferenceId) {
        setPreferenceId(data.preferenceId); // Usar preferenceId en lugar de id
        setSelectedPlan(plan);
      } else {
        console.error(
          '❌ La respuesta del servidor no tiene un ID válido:',
          data
        );
        throw new Error(
          'La respuesta del servidor no contiene un ID de preferencia válido'
        );
      }
    } catch (error) {
      console.error('🚨 Error en handleCreatePreference:', error);
    }
  };

  return (
    <div className="text-center py-8 bg-primary gap-1">
      <div className="flex justify-center items-center mb-6">
        <TitleBox title="Nuestras Membresías" />
      </div>

      {/* Sección de Tarjetas de Membresías */}
      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((membership, index) => (
          <div
            key={index}
            className="w-80 p-6 bg-secondary rounded-lg whiteShadow text-center border border-gray-300 cursor-pointer"
          >
            <h3 className="text-2xl font-holtwood text-black uppercase">
              {membership.title}
            </h3>
            <p className="text-2xl font-holtwood text-black mt-2">
              ${membership.price}
              <span className="text-sm font-light">/MES</span>
            </p>
            <ul className="text-left mt-4 mb-4">
              {membership.benefits.map((benefit, idx) => (
                <li
                  key={idx}
                  className="text-lg text-black flex items-center gap-2"
                >
                  <ChevronsRight className="text-black w-6 h-6" /> {benefit}
                </li>
              ))}
            </ul>
            <button
              className="w-full bg-tertiary text-primary font-holtwood text-lg py-2 px-4 rounded-md hover:bg-opacity-80 transition"
              onClick={() => handleCreatePreference(membership)}
              disabled={!!preferenceId}
            >
              {preferenceId ? 'Seleccionado' : 'Seleccionar'}
            </button>
          </div>
        ))}
      </div>

      {/* Sección de Confirmación */}
      {preferenceId && selectedPlan && (
        <div className="flex items-center justify-center mt-6">
          <div className="w-72">
            <h2 className="text-xl text-white font-semibold mb-4">
              Proceso de pago para: {selectedPlan.title}
            </h2>
            <Wallet initialization={{ preferenceId }} />
          </div>
        </div>
      )}
    </div>
  );
}

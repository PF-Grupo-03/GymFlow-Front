'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
    price: 1,
    benefits: [
      'Acceso al Gimnasio',
      'Reserva de turnos de musculación de 8:00 a 18:00hrs',
      'Asistencia Pasiva',
      'Registro de avances',
    ],
  },
  {
    title: 'Plan Premium',
    price: 2,
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
    price: 3,
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

  const { isAuthenticated, userId, userEmail, userData } = useAuth(); // Obtén el estado de autenticación y los datos del usuario
  const router = useRouter();

  const paymentButtonRef = useRef<HTMLDivElement>(null);

  // Verificar si el usuario tiene una membresía activa
  const hasActiveMembership = () => {
    if (!userData) return false;

    const activeRoles = ['USER_BASIC', 'USER_PREMIUM', 'USER_DIAMOND'];
    return activeRoles.includes(userData.user.role);
  };

  // Obtener el nombre de la membresía activa
  const getActiveMembershipName = () => {
    if (!userData) return '';

    switch (userData.user.role) {
      case 'USER_BASIC':
        return 'Básico';
      case 'USER_PREMIUM':
        return 'Premium';
      case 'USER_DIAMOND':
        return 'Diamond';
      default:
        return '';
    }
  };

  const handleCreatePreference = async (plan: Plan) => {
    if (!isAuthenticated) {
      Toast.fire({
        icon: 'warning',
        title: 'Para elegir un plan, debes iniciar sesión.',
      });
      router.push('/Signin');
      return;
    }

    // Verificar si el usuario tiene una membresía activa
    if (hasActiveMembership()) {
      return; // No hacer nada si ya tiene una membresía activa
    }

    try {
      console.log('📌 Enviando solicitud para crear preferencia');
      console.log('📦 Datos enviados al backend:', {
        title: plan.title,
        price: plan.price,
        userId: userId,
        userEmail: userEmail,
      });

      localStorage.setItem('selectedPlanAmount', plan.price.toString());

      const response = await fetch(
        'https://gymflow-back.onrender.com/payment/preference',
        {
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
        }
      );

      console.log('🔍 Respuesta completa del servidor:', response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error en la respuesta del backend:', errorText);
        throw new Error('Error al crear la preferencia: ' + errorText);
      }

      const data = await response.json();
      console.log('✅ Respuesta parseada:', data);

      if (data && data.preferenceId) {
        setPreferenceId(data.preferenceId);
        setSelectedPlan(plan);

        setTimeout(() => {
          if (paymentButtonRef.current) {
            paymentButtonRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }, 100);
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
              disabled={!!preferenceId || hasActiveMembership()} // Deshabilitar si ya tiene una membresía activa
            >
              {hasActiveMembership()
                ? 'Membresía Activa'
                : preferenceId
                ? 'Seleccionado'
                : 'Seleccionar'}
            </button>

            {/* Mostrar mensaje si el usuario tiene una membresía activa */}
            {hasActiveMembership() && (
              <div className="mt-4 font-odor text-sm text-red-600">
                Actualmente posees la membresía: {getActiveMembershipName()}.
                <br />
                Debes esperar a que expire para adquirir otra.
              </div>
            )}
          </div>
        ))}
      </div>

      {preferenceId && selectedPlan && (
        <div
          ref={paymentButtonRef}
          className="flex items-center justify-center mt-6"
          style={{ minHeight: '200px' }}
        >
          <div className="w-72">
            <h2 className="text-2xl text-white font-odor mb-4">
              Proceso de pago para: {selectedPlan.title}
            </h2>
            <Wallet initialization={{ preferenceId }} />
          </div>
        </div>
      )}
    </div>
  );
}

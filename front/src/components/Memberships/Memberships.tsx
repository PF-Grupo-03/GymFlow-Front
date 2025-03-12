'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import TitleBox from '../TitleBox/TitleBox';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { ChevronsRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Toast } from '../Toast/Toast';
import useUserData from '@/helpers/users.helper';
import { Plan, plans } from '@/data/PlanMemberships';

initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY, {
  locale: 'es-AR',
});

export default function Memberships() {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const { isAuthenticated, userId, userEmail } = useAuth();
  const { userData, loading, error } = useUserData();
  const router = useRouter();

  const paymentButtonRef = useRef<HTMLDivElement>(null);

  const handleCreatePreference = async (plan: Plan) => {
    if (!isAuthenticated) {
      Toast.fire({
        icon: 'warning',
        title: 'Para elegir un plan, debes iniciar sesión.',
      });
      router.push('/Signin');
      return;
    }

    if (userData?.member?.isActive) {
      Toast.fire({
        icon: 'error',
        title: 'Ya tienes una membresía activa.',
      });
      return;
    }

    try {
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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Error al crear la preferencia: ' + errorText);
      }

      const data = await response.json();
      if (data?.preferenceId) {
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
        throw new Error('La respuesta del servidor no contiene un ID válido');
      }
    } catch (error) {
      console.error('🚨 Error en handleCreatePreference:', error);
    }
  };

  if (loading) return <p>Cargando membresías...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="text-center py-8 bg-primary gap-1">
      <div className="flex justify-center items-center mb-6">
        <TitleBox title="Nuestras Membresías" />
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((membership, index) => (
          <div
            key={index}
            className="w-80 p-6 bg-secondary rounded-lg whiteShadow text-center border border-gray-300 cursor-pointer flex flex-col"
          >
            <h3 className="text-2xl font-holtwood text-black uppercase">
              {membership.title}
            </h3>
            <p className="text-2xl font-holtwood text-black mt-2">
              ${membership.price}
              <span className="text-sm font-light">/MES</span>
            </p>
            <ul className="text-left mt-4 mb-4 flex-1">
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
              className="w-full bg-tertiary text-primary font-holtwood text-lg py-2 px-4 rounded-md hover:bg-opacity-80 transition mt-auto"
              onClick={() => handleCreatePreference(membership)}
              disabled={userData?.member?.isActive}
            >
              {userData?.member?.isActive ? 'Membresía Activa' : 'Seleccionar'}
            </button>

            {userData?.member?.isActive && (
              <div className="mt-4 font-odor text-sm text-red-600">
                Actualmente posees la membresía:{' '}
                {userData.member.memberShipType}.
                <br />
                Vigente hasta:{' '}
                {new Date(userData.member.endDate).toLocaleDateString()}.
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

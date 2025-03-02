/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import TitleBox from '../TitleBox/TitleBox';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { jwtDecode } from 'jwt-decode';
import { ChevronsRight } from 'lucide-react';

initMercadoPago('TEST-e8c5932a-0595-44b2-afe3-42082a339608', {
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (preferenceId) {
      console.log('Preference ID actualizado:', preferenceId);
    }
  }, [preferenceId]);

  const handleCreatePreference = async (plan: Plan) => {
    const storedData = localStorage.getItem('userSession');
    const parsedData = JSON.parse(storedData || 'null');
    const token = parsedData?.token?.token;
    try {
      console.log('Creando preferencia para el plan:', plan);

      if (!token) {
        setError('No se encontró un token. El usuario no está autenticado.');
        return;
      }

      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id;

      console.log('Datos enviados al backend:', {
        turno: {
          service: plan.title,
          price: plan.price,
        },
        userId: userId,
        userEmail: decodedToken.email,
      });

      const response = await fetch('http://localhost:3001/payment/preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          turno: {
            service: plan.title,
            price: plan.price,
          },
          userId: userId,
          userEmail: decodedToken.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la preferencia');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (data && data.id) {
        setPreferenceId(data.id);
        setSelectedPlan(plan);
      } else {
        throw new Error(
          'La respuesta del servidor no contiene un ID de preferencia válido'
        );
      }
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
      setError('Error al crear la preferencia de pago');
    }
  };

  return (
    <div className="text-center py-12 bg-primary -mt-5">
      <div className="flex justify-center items-center">
        <TitleBox title="Nuestras Membresías" />
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-10 pb-12">
        {plans.map((membership, index) => (
          <div
            key={index}
            className="w-80 p-6 bg-secondary rounded-lg whiteShadow text-center border border-gray-300 cursor-pointer"
          >
            {/* Título */}
            <h3 className="text-2xl font-holtwood text-black uppercase">
              {membership.title}
            </h3>

            {/* Precio */}
            <p className="text-2xl font-holtwood text-black mt-2">
              ${membership.price}
              <span className="text-sm font-light">/MES</span>
            </p>

            {/* Lista de Beneficios */}
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

            {/* Botón de Selección */}
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

      {preferenceId && selectedPlan && (
        <div className="text-center mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Proceso de pago para: {selectedPlan.title}
          </h2>
          <Wallet initialization={{ preferenceId }} />
        </div>
      )}
    </div>
  );
}

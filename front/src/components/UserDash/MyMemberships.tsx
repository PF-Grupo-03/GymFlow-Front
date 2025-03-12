'use client';

import { ChevronsRight } from 'lucide-react';
import useUserData from '@/helpers/users.helper';

const benefitsMap: { [key: string]: string[] } = {
  BASIC: [
    'Acceso al gimnasio',
    '1 clase grupal por semana',
    'Reserva de turnos de musculación de 8:00 a 18:00hrs',
    'Asistencia Pasiva',
    'Registro de avances',
  ],
  PREMIUM: [
    'Acceso al gimnasio',
    'Clases ilimitadas',
    'Asesoramiento personalizado',
    'Reserva de turnos de musculación las 24hrs',
    'Reserva de turnos de clases las 24hrs',
    'Asistencia Pasiva',
    'Registro de avances',
    'Plan de entrenamiento',
  ],
  DIAMOND: [
    'Acceso total',
    'Clases ilimitadas',
    'Entrenador personal',
    'Eventos VIP',
    'Reserva de turnos las 24hrs',
    'Asistencia Activa',
    'Registro de avances',
    'Plan dietético',
  ],
};

const mapMembershipName = (type: string): string => {
  switch (type) {
    case 'BASIC':
      return 'Básica';
    case 'PREMIUM':
      return 'Premium';
    case 'DIAMOND':
      return 'Diamond';
    default:
      return 'Sin Membresía';
  }
};

const MyMembership = () => {
  const { userData, loading, error } = useUserData();

  if (loading) return <p>Cargando membresía...</p>;
  if (error || !userData?.member) return <p>No tienes membresía activa.</p>;

  const { member } = userData;
  const benefits = benefitsMap[member.memberShipType] || [];

  return (
    <div className="flex flex-col gap-4 bg-secondary p-6 rounded-xl shadow-lg text-primary max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center">Mi Membresía</h2>

      <div>
        <p>
          <strong>Tipo:</strong> {mapMembershipName(member.memberShipType)}
        </p>
        <p>
          <strong>Estado:</strong> {member.isActive ? 'Activa' : 'Inactiva'}
        </p>
        <p>
          <strong>Inicio:</strong>{' '}
          {new Date(member.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Finaliza:</strong>{' '}
          {new Date(member.endDate).toLocaleDateString()}
        </p>
      </div>

      <div>
        <h3 className="font-semibold mt-4">Beneficios:</h3>
        <ul className="list-disc list-inside">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2">
              <ChevronsRight className="text-tertiary w-6 h-6" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyMembership;

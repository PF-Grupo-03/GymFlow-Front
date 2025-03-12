export interface Plan {
  title: string;
  price: number;
  benefits: string[];
}

export const plans: Plan[] = [
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

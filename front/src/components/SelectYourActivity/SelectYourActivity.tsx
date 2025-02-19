import Carousel from './Carousel';

const activities1 = [
  {
    title: 'Entrenamiento de fuerza',
    image: '/assets/Musculacion.jpg',
  },
  {
    title: 'Entrena con nosotros',
    image: '/assets/Musculacion1.jpg',
  },
  {
    title: 'Entrenamiento personalizado',
    image: '/assets/Musculacion2.jpg',
  },
  {
    title: 'El mejor equipo',
    image: '/assets/Musculacion3.jpg',
  },
  {
    title: 'El mejor ambiente',
    image: '/assets/Musculacion5.jpg',
  },
];

const activities2 = [
  {
    title: 'Personal Especializado',
    image: '/assets/Funcionales.jpg',
  },
  {
    title: 'Ejercicios de Alto impacto',
    image: '/assets/Funcionales1.jpg',
  },
  {
    title: 'Ambiente estimulante',
    image: '/assets/Funcionales2.jpg',
  },
  {
    title: 'Diversas clases',
    image: '/assets/Funcionales3.jpg',
  },
  {
    title: 'Instalaciones de primera',
    image: '/assets/Funcionales4.jpg',
  },
];

const SelectYourActivitie: React.FC = () => {
  return (
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center space-y-6">
      <h2 className="font-holtwood text-4xl text-tertiary mt-2 mb-2">
        ¡Elige tu actividad!
      </h2>

      <h3 className="font-holtwood text-3xl text-secondary mt-0 mb-0">
        Musculación
      </h3>
      <Carousel items={activities1} />

      <p className="font-ibm text-secondary text-[20px] leading-[1.15] text-justify max-w-[65%] mx-auto">
        Si tu objetivo es aumentar fuerza y tonificar tu cuerpo, la musculación
        es para ti. Trabaja cada grupo muscular con ejercicios específicos que
        te ayudarán a lograr resultados visibles y duraderos.
      </p>

      <h3 className="font-holtwood text-3xl text-secondary">Funcionales</h3>
      <Carousel items={activities2} />

      <p className="font-ibm text-secondary text-[20px] leading-[1.15] text-justify max-w-[65%] mx-auto">
        Si quieres mejorar tu resistencia, agilidad y flexibilidad, el
        entrenamiento funcional es ideal. Movimientos dinámicos que mejoran tu
        condición física general, perfectos para un cuerpo más fuerte y
        equilibrado.
      </p>
    </div>
  );
};

export default SelectYourActivitie;

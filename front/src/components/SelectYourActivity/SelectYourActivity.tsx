import { activities1, activities2 } from '@/data/CarouselItems';
import Carousel from './Carousel';

const SelectYourActivitie: React.FC = () => {
  return (
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center space-y-6">
      <h2 className="font-holtwood text-4xl text-tertiary mt-2 mb-2">
        ¡Elegí tu actividad!
      </h2>

      <h3 className="font-holtwood text-3xl text-secondary mt-0 mb-0">
        Musculación
      </h3>
      <Carousel items={activities1} />

      <p className="font-ibm text-secondary text-[20px] leading-[1.15] text-justify max-w-[65%] mx-auto">
        Si tu objetivo es aumentar fuerza y tonificar tu cuerpo, la musculación
        es para vos. Trabajá cada grupo muscular con ejercicios específicos que
        te ayudarán a lograr resultados visibles y duraderos.
      </p>

      <h3 className="font-holtwood text-3xl text-secondary">Funcionales</h3>
      <Carousel items={activities2} />

      <p className="font-ibm text-secondary text-[20px] leading-[1.15] text-justify max-w-[65%] mx-auto pb-4">
        Si querés mejorar tu resistencia, agilidad y flexibilidad, el
        entrenamiento funcional es ideal. Movimientos dinámicos que mejoran tu
        condición física general, perfectos para un cuerpo más fuerte y
        equilibrado.
      </p>
    </div>
  );
};

export default SelectYourActivitie;

import { activities1, activities2 } from '@/data/CarouselItems';
import Carousel from './Carousel';

const SelectYourActivitie: React.FC = () => {
  return (
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center space-y-6">
      <h2 className="font-holtwood text-2xl text-tertiary pb-3">
        ¡Elegí tu actividad!
      </h2>

      <div className="w-full max-w-[800px] flex flex-col items-center">
        <h3 className="font-holtwood text-2xl text-secondary mt-0 mb-0">
          Musculación
        </h3>
        <Carousel items={activities1} />
        <div className="w-full max-w-[800px] px-4">
          <p className="font-ibm text-secondary text-[20px] leading-[1.15] text-justify">
            Si tu objetivo es aumentar fuerza y tonificar tu cuerpo, la
            musculación es para vos. Trabajá cada grupo muscular con ejercicios
            específicos que te ayudarán a lograr resultados visibles y
            duraderos.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[800px] flex flex-col items-center">
        <h3 className="font-holtwood text-2xl text-secondary">Funcionales</h3>
        <Carousel items={activities2} />
        <div className="w-full max-w-[800px] px-4 pb-4">
          <p className="font-ibm text-secondary text-[20px] leading-[1.15] text-justify">
            Si querés mejorar tu resistencia, agilidad y flexibilidad, el
            entrenamiento funcional es ideal. Movimientos dinámicos que mejoran
            tu condición física general, perfectos para un cuerpo más fuerte y
            equilibrado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectYourActivitie;

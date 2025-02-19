'use client';
import { useState, useEffect } from 'react';
import CarouselItem from './CarouselItem';
import { ICarouselProps } from '@/interfaces/SelectYourActivitiyInterface';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';

const Carousel: React.FC<ICarouselProps> = ({ items }) => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));

  // Efecto para el cambio automático de imágenes cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [current]); // Se ejecuta cuando cambia la imagen actual

  return (
    <div className="relative w-full max-w-[800px] mx-auto overflow-hidden mt-0 p-0 rounded-lg">
      <div className="relative w-full flex justify-center items-center h-[500px]">
        {items.map((item, index) => (
          <CarouselItem key={index} item={item} isActive={index === current} />
        ))}
      </div>

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-20 h-20 flex items-center justify-center bg-tertiary/80 rounded-full shadow-md hover:bg-tertiary transition"
        onClick={prevSlide}
      >
        <ArrowBigLeft className="text-black w-16 h-10" />
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-20 h-20 flex items-center justify-center bg-tertiary/80 rounded-full shadow-md hover:bg-tertiary transition"
        onClick={nextSlide}
      >
        <ArrowBigRight className="text-black w-16 h-10" />
      </button>
    </div>
  );
};

export default Carousel;

'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function GymFlowBanner() {
  const router = useRouter();

  return (
    <div className="relative w-full min-h-[50vh] md:h-[650px] lg:h-[792px] overflow-hidden -mt-5 rounded-b-[10px]">
      <Image
        src="/gymFlowBanner/fitnessportada.png"
        alt="Gym Flow Background"
        fill
        className="absolute inset-0 object-cover w-full h-full"
      />

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <h1
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center text-secondary 
        text-xl md:text-3xl lg:text-4xl leading-tight font-ibm font-normal 
        max-w-[90%] md:max-w-[80%] lg:w-[874px]"
      >
        Bienvenidos a GYM FLOW ¡Transforma tu cuerpo, mente y estilo de vida!
      </h1>

      <button
        onClick={() => router.push('/Plans')}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 
        w-[220px] md:w-[260px] lg:w-[308px] h-[50px] md:h-[60px] lg:h-[68px] 
        bg-secondary rounded-[10px] flex items-center justify-center shadow-md 
        hover:bg-tertiary transition"
      >
        <span className="text-lg md:text-2xl lg:text-[40px] leading-[1.2] font-odor font-normal text-primary">
          Ver Planes
        </span>
      </button>
    </div>
  );
}

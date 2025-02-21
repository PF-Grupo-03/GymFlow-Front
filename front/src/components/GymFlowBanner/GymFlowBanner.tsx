'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function GymFlowBanner() {
  const router = useRouter();

  return (
    <div className="relative w-full h-[792px] overflow-hidden -mt-5 rounded-b-[10px]">
      <Image
        src="/gymFlowBanner/fitnessportada.png"
        alt="Gym Flow Background"
        fill
        className="absolute inset-0 object-cover w-full h-full"
      />

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <h1 className="absolute top-[305px] left-1/2 transform -translate-x-1/2 w-[874px] h-[96px] text-[40px] leading-[48.4px] font-ibm font-normal text-center text-secondary">
        Bienvenidos a GYM FLOW ¡Transforma tu cuerpo, mente y estilo de vida!
      </h1>

      <button
        onClick={() => router.push('/Plans')}
        className="absolute top-[459px] left-1/2 transform -translate-x-1/2 w-[308px] h-[68px] bg-secondary rounded-[10px] flex items-center justify-center shadow-md hover:bg-tertiary transition"
      >
        <span className="text-[40px] leading-[72.27px] font-odor font-normal text-primary">
          Ver Planes
        </span>
      </button>
    </div>
  );
}

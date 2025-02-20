"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function GymFlowBanner() {
  const router = useRouter();

  return (
    <div className="relative w-full h-[792px] mt-[40px] overflow-hidden">
      {/* Imagen de fondo */}
      <Image
        src="/gymFlowBanner/fitnessportada.png"
        alt="Gym Flow Background"
        fill
        className="absolute inset-0 object-cover w-full h-full opacity-30"
      />

      {/* Texto de bienvenida */}
      <h1 className="absolute top-[305px] left-1/2 transform -translate-x-1/2 w-[874px] h-[96px] text-[40px] leading-[48.4px] font-ibm font-normal text-center text-secondary">
        Bienvenidos a GYM FLOW ¡Transforma tu cuerpo, mente y estilo de vida!
      </h1>

      {/* Botón */}
      <button
        onClick={() => router.push('/planes')}
        className="absolute top-[459px] left-1/2 transform -translate-x-1/2 w-[308px] h-[68px] bg-secondary rounded-[10px] flex items-center justify-center shadow-md"
      >
        <span className="text-[40px] leading-[72.27px] font-odor font-normal text-primary">
          Ver Planes
        </span>
      </button>
    </div>
  );
}

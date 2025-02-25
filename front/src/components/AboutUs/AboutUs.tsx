'use client';

import Image from 'next/image';

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col justify-center text-center py-12 bg-primary">
      <h2 className="text-3xl font-holtwood text-tertiary mb-8">
        SOBRE NOSOTROS
      </h2>
      <div className="flex flex-col items-center gap-8 p-6 rounded-lg relative bg-primary border-2 border-tertiary orangeShadow max-w-3xl mx-auto">
        <Image
          src="/AboutUs/about-us.jpg"
          alt="About Us"
          width={600}
          height={400}
          className="w-3/4 max-w-md mx-auto rounded-lg"
        />
        <p className="text-lg text-secondary font-ibm leading-relaxed relative z-10">
          En <span className="font-holtwood">Nuestro Gimnasio</span>, nos
          apasiona ayudarte a alcanzar tus metas de salud y bienestar. Ofrecemos
          instalaciones de primer nivel, entrenadores capacitados y una
          comunidad motivadora para que puedas dar lo mejor de ti en cada
          entrenamiento.
        </p>
        <p className="text-lg text-secondary font-ibm leading-relaxed relative z-10">
          Nuestro compromiso es brindarte las mejores herramientas para mejorar
          tu rendimiento, ya sea a través de nuestras clases, equipamiento de
          última generación o asesoramiento personalizado.
        </p>
      </div>
    </div>
  );
}

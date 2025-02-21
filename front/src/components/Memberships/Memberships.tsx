'use client';

import { memberships } from '@/data/Memberships';

export default function Memberships() {
  return (
    <div className="text-center py-12 bg-primary -mt-5">
      {/* Título con fondo y sombra */}
      <div className="inline-block bg-tertiary px-8 py-3 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold font-holtwood text-primary tracking-wider">
          NUESTRAS MEMBRESÍAS
        </h2>
      </div>

      {/* Contenedor de tarjetas */}
      <div className="flex justify-center gap-10 mt-10">
        {memberships.map((membership, index) => (
          <div
            key={index}
            className="w-80 p-6 bg-secondary rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,0.6)] text-center border border-gray-300"
          >
            {/* Título de cada membresía */}
            <h3 className="text-2xl font-holtwood text-black uppercase">
              {membership.title}
            </h3>

            {/* Precio */}
            <p className="text-2xl font-holtwood text-black mt-2">
              ${membership.price}
              <span className="text-sm font-light">/MES</span>
            </p>

            {/* Lista de características */}
            <ul className="mt-4 text-left text-md text-black font-ibm">
              {membership.features.map((feature, i) => (
                <li key={i} className="mb-2">
                  • {feature}
                </li>
              ))}
            </ul>

            {/* Botón de adquirir */}
            <button className="mt-6 bg-tertiary text-black font-holtwood py-2 px-6 rounded-md shadow-lg hover:bg-[#E66400] transition">
              ADQUIRIR
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


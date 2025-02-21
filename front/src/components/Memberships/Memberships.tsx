'use client';

import { memberships } from '@/data/Memberships';

export default function Memberships() {
  return (
    <div className="text-center py-12">
      <h2 className="text-3xl font-holtwood text-primary mb-8">
        NUESTRAS MEMBRESÍAS
      </h2>
      <div className="flex justify-center gap-8 p-6 rounded-lg relative bg-white shadow-lg">
        <div
          className="absolute bottom-0 left-0 w-full h-full rounded-[25%] border-b-[8px] border-l-[8px] border-transparent"
          style={{
            borderImage:
              'linear-gradient(to top right, rgba(209,208,208,0.8), rgba(171,171,171,0.6), rgba(138,138,138,0.5)) 1',
          }}
        ></div>
        {memberships.map((membership, index) => (
          <div
            key={index}
            className="w-80 p-6 bg-secondary rounded-lg shadow-lg text-center relative z-10"
          >
            <h3 className="text-2xl font-holtwood text-primary">
              {membership.title}
            </h3>
            <p className="text-xl font-holtwood text-primary mt-2">
              {membership.price}
            </p>
            <ul className="mt-4 text-left text-sm text-primary">
              {membership.features.map((feature, i) => (
                <li key={i} className="mb-2 font-ibm">
                  • {feature}
                </li>
              ))}
            </ul>
            <button className="mt-4 bg-tertiary text-primary font-holtwood py-2 px-4 rounded-lg hover:bg-orange-600">
              Adquirir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

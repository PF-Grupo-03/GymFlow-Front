'use client';

import { useRouter } from 'next/navigation';
import { memberships } from '@/data/Memberships';
import { useAuth } from '@/context/AuthContext';
import { Toast } from '../Toast/Toast';
import TitleBox from '../TitleBox/TitleBox';

export default function Memberships() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleSelectPlan = (price: number) => {
    if (!isAuthenticated) {
      Toast.fire({
        icon: 'error',
        title: 'Debes iniciar sesión para adquirir una membresía.',
      });
      return;
    }
    router.push(`/Checkoutmp?amount=${price}`); // Redirige con el monto en la URL
  };

  return (
    <div className="text-center py-12 bg-primary -mt-5">
      <div className='flex justify-center items-center'>
      <TitleBox title="Nuestras Membresías" />
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-10 pb-12">
        {memberships.map((membership, index) => (
          <div
            key={index}
            className="w-80 p-6 bg-secondary rounded-lg whiteShadow text-center border border-gray-300"
          >
            <h3 className="text-2xl font-holtwood text-black uppercase">
              {membership.title}
            </h3>

            <p className="text-2xl font-holtwood text-black mt-2">
              ${membership.price}
              <span className="text-sm font-light">/MES</span>
            </p>

            <ul className="mt-4 text-left text-md text-black font-ibm">
              {membership.features.map((feature, i) => (
                <li key={i} className="mb-2">
                  • {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectPlan(membership.price)}
              className="mt-6 bg-tertiary text-black font-holtwood py-2 px-6 rounded-md shadow-lg hover:bg-[#E66400] transition"
            >
              ADQUIRIR
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

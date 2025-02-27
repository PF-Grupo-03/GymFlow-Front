'use client';

import { useRouter } from 'next/navigation';
import { memberships } from '@/data/Memberships';
import { useAuth } from '@/context/AuthContext';

export default function PlansCompare() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleSelectPlan = (price: number) => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para comprar una membresía.');
      return;
    }
    router.push(`/checkoutmp?amount=${price}`);
  };

  return (
    <div className="text-center py-12 bg-primary">
      <h2 className="text-3xl font-bold font-holtwood text-primary tracking-wider">
        COMPARACIÓN DE PLANES
      </h2>

      <div className="flex justify-center mt-10">
        <table className="border-collapse border border-gray-300 bg-white shadow-lg">
          <thead>
            <tr className="bg-tertiary text-black">
              <th className="px-6 py-3">Plan</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Características</th>
              <th className="px-6 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((membership, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="px-6 py-4 font-bold">{membership.title}</td>
                <td className="px-6 py-4">${membership.price}/mes</td>
                <td className="px-6 py-4">
                  <ul className="list-disc list-inside">
                    {membership.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleSelectPlan(membership.price)}
                    className="bg-tertiary text-black font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#E66400] transition"
                  >
                    Adquirir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

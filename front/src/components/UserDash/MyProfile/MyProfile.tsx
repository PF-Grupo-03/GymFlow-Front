'use client';

import { MyAccountItem, MyAccountItems } from '@/data/MyAccountItems';
import styles from './MyProfile.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
  Nombre: string;
  Email: string;
  Telefono: string;
  Dirección: string;
  DNI: string;
  Membresia: string;
}

const MyProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  // Función para mapear el rol a un nombre de membresía amigable
  const mapRoleToMembershipName = (role: string): string => {
    switch (role) {
      case 'USER_BASIC':
        return 'Básica';
      case 'USER_PREMIUM':
        return 'Premium';
      case 'USER_DIAMOND':
        return 'Diamond';
      case 'USER_MEMBER':
        return 'Sin Membresía';
      default:
        return 'Sin Membresía';
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('userSession');

    if (user) {
      const userParsed = JSON.parse(user);

      const { nameAndLastName, email, phone, address, dni, role } =
        userParsed.user;

      // Mapear el rol a un nombre de membresía amigable
      const membresia = mapRoleToMembershipName(role);

      setUserData({
        Nombre: nameAndLastName,
        Email: email,
        Telefono: phone,
        Dirección: address,
        DNI: dni,
        Membresia: membresia, // Usar el nombre de membresía mapeado
      });
    }
  }, []);

  return (
    <>
      {/* Título */}
      <div className="flex justify-center items-center mt-5 font-odor mb-1">
        <h2 className="inline-block bg-white text-3xl rounded-[10px] text-primary px-4 py-2 mx-2 whiteShadow">
          Mi Perfil
        </h2>
      </div>

      {/* Contenedor general */}
      <div className="flex justify-center items-center mt-1 mb-20 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        <div
          className={`flex flex-col justify-center items-center mt-5 gap-8 bg-secondary ${styles.whiteShadow} w-full max-w-2xl rounded-[10px] px-4 sm:px-8 md:px-12 py-8 sm:py-12 font-holtwood text-primary`}
        >
          {/* Información del usuario */}
          {MyAccountItems.map((item: MyAccountItem) => {
            const value: string = userData
              ? userData[item.name as keyof UserData]
              : '';
            return (
              <div key={item.id} className="w-full">
                <span className="text-sm sm:text-base">{item.name}:</span>
                <div className="border-2 rounded-[10px] border-tertiary w-full h-auto min-h-10 text-xs sm:text-sm flex justify-center items-center px-3 py-2 break-words">
                  <span className="text-center font-odor leading-relaxed tracking-wide">
                    {value}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Botón para ir a turnos */}
          <button
            className="w-full bg-tertiary text-primary rounded-lg p-3 mt-2 hover:bg-orange-400 transition-all duration-300 hover:scale-105"
            onClick={() => router.push('/MyTurns')}
          >
            Mis Turnos
          </button>
        </div>
      </div>
    </>
  );
};

export default MyProfile;

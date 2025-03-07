'use client';

import { MyAccountItem, MyAccountItems } from '@/data/MyAccountItems';
import styles from './MyAccount.module.css';
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

const MyAccountComponent = () => {
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
      <div className="flex justify-center items-center mt-5 font-odor mb-1">
        <h2 className="inline-block bg-white text-3xl rounded-[10px] text-primary px-4 py-2 mx-2 whiteShadow">
          Mi Perfil
        </h2>
      </div>
      <div className="flex justify-center items-center mt-1 mb-20 mx-6 sm:mx-12 md:mx-20 lg:mx-32 xl:mx-48">
        <div
          className={`flex flex-col justify-center items-center mt-5 gap-8 bg-secondary ${styles.whiteShadow} w-full sm:w-5/6 md:w-3/4 lg:w-1/2 xl:w-2/5 rounded-[10px] px-4 sm:px-8 md:px-12 py-8 sm:py-12 font-holtwood text-primary`}
        >
          {MyAccountItems.map((item: MyAccountItem) => {
            const value: string = userData
              ? userData[item.name as keyof UserData]
              : '';
            return (
              <div key={item.id} className="w-full">
                <span>{item.name}:</span>
                <div className="border-2 rounded-[10px] border-tertiary w-full h-8 text-xs flex justify-center items-center">
                  <span>{value}</span>
                </div>
              </div>
            );
          })}
          <button
            className="w-full bg-tertiary text-primary rounded-lg p-2 mt-2 hover:bg-orange-400 transition-all duration-300 hover:scale-105"
            onClick={() => router.push('/MyTurns')}
          >
            Mis Turnos
          </button>
        </div>
      </div>
    </>
  );
};

export default MyAccountComponent;

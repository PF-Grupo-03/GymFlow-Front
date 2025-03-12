'use client';

import { MyAccountItems } from '@/data/MyAccountItems';
import useUserData from '@/helpers/users.helper';

import { useRouter } from 'next/navigation';
import UserInfoItem from '../UserInfoItems';

const MyProfile = () => {
  const { userData, loading, error } = useUserData();
  const router = useRouter();

  if (loading) return <p>Cargando perfil...</p>;
  if (error || !userData)
    return <p>Error: {error || 'No se encontraron datos.'}</p>;

  // ✅ Mapeo de tipos de membresía según memberShipType
  const mapMembershipType = (type: string): string => {
    switch (type) {
      case 'BASIC':
        return 'Básica';
      case 'PREMIUM':
        return 'Premium';
      case 'DIAMOND':
        return 'Diamond';
      default:
        return 'Sin Membresía';
    }
  };

  // ✅ Construimos el objeto de información del usuario
  const userInfoMap = {
    Nombre: userData.nameAndLastName,
    Email: userData.email,
    Telefono: userData.phone,
    Dirección: userData.address,
    DNI: userData.dni,
    Membresía: userData.member
      ? `${mapMembershipType(userData.member.memberShipType)} (${
          userData.member.isActive ? 'Activa' : 'Inactiva'
        })`
      : 'No posee membresía',
  };

  return (
    <>
      <div className="flex justify-center items-center mt-5 font-odor mb-1">
        <h2 className="inline-block bg-white text-3xl rounded-[10px] text-primary px-4 py-2 mx-2 mb-4 whiteShadow">
          Mi Perfil
        </h2>
      </div>

      <div className="flex justify-center items-center mt-1 mb-20 mx-4">
        <div className="flex flex-col justify-center items-center gap-8 bg-secondary whiteShadow w-full max-w-2xl rounded-[10px] p-8 font-holtwood text-primary">
          {MyAccountItems.map((item) => (
            <UserInfoItem
              key={item.id}
              label={item.name}
              value={userInfoMap[item.name as keyof typeof userInfoMap] || ''}
            />
          ))}

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

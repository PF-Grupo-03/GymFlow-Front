import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Toast } from '../Toast/Toast';

export const LogoutButton: React.FC = () => {
  const { setUserData } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    setUserData(null);
    Cookies.remove('userData');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/Login');
    Toast.fire({
      icon: 'success',
      title: 'Sesioó cerrada',
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="text-secondary bg-primary h-12 p-3 px-5 rounded-[10px] hover:bg-[#4b4b4b] transition duration-300 w-full"
    >
      Cerrar Sesión
    </button>
  );
};

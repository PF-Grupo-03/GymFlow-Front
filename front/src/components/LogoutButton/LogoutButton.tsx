import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Toast } from '../Toast/Toast';
import { LogOut } from 'lucide-react'; // Importar icono desde lucide-react

export const LogoutButton: React.FC = () => {
  const { setUserData } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    setUserData(null);
    Cookies.remove('userData');
    localStorage.removeItem('userSession');
    router.push('/Signin');
    Toast.fire({
      icon: 'success',
      title: 'Sesión cerrada',
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="text-secondary bg-primary h-12 p-3 px-5 rounded-[10px] hover:bg-[#4b4b4b] transition duration-300 w-full flex items-center justify-center gap-2"
    >
      <LogOut className="w-5 h-5" />
      <span className="hidden sm:inline">Cerrar Sesión</span>
    </button>
  );
};

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import { Toast } from '../Toast/Toast';

export const LogoutButton: React.FC = () => {
  const { setUserData } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    setUserData(null);

    // Eliminar todas las cookies de autenticación
    Cookies.remove('userData');
    Cookies.remove('next-auth.session-token');
    Cookies.remove('next-auth.csrf-token');
    Cookies.remove('next-auth.callback-url');
    Cookies.remove('__Secure-next-auth.session-token');
    Cookies.remove('__Secure-next-auth.callback-url');

    // Eliminar datos locales
    localStorage.removeItem('userSession');

    // Cerrar sesión con Google
    await fetch('/api/auth/signout', { method: 'POST' });

    // Redirigir a Google para forzar el cierre de sesión
    window.location.href = 'https://accounts.google.com/Logout';

    Toast.fire({
      icon: 'success',
      title: 'Sesión cerrada',
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="text-secondary bg-primary h-12 p-3 px-5 rounded-[10px] hover:bg-[#4b4b4b] transition duration-300 w-full lg:w-auto"
    >
      Cerrar Sesión
    </button>
  );
};

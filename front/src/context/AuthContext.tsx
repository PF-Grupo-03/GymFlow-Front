'use client';

import { IUserSession } from '@/interfaces/IUserSession';
import { createContext, useContext, useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export interface AuthContextProps {
  userData: IUserSession | null;
  setUserData: (userData: IUserSession | null) => void;
  isAuthenticated: boolean;
  loginWithGoogle: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  userData: null,
  setUserData: () => {},
  isAuthenticated: false,
  loginWithGoogle: () => {},
  logout: () => {},
});

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (session?.user) {
      const userSession: IUserSession = {
        token: session?.accessToken ?? '', // Puedes asignar el token aquí si lo necesitas
        user: {
          id: '', // Si el id está disponible en session.user
          nameAndLastName: session.user.name!, // O usa el nombre completo
          bDate: '', // Si necesitas agregar esta propiedad, obténla de alguna parte
          email: session.user.email!,
          password: '', // Aquí asume que no puedes obtener la contraseña por razones de seguridad
          confirmPassword: '', // Igual para la confirmación de contraseña
          phone: '', // Si quieres agregar un teléfono, ajusta según lo que tengas disponible
          address: '', // Lo mismo con la dirección
          role: '', // Lo mismo con el rol
        },
      };
      setUserData(userSession);
      setIsAuthenticated(true);
      localStorage.setItem('userSession', JSON.stringify(userSession));
    } else {
      const storedSession = localStorage.getItem('userSession');
      if (storedSession) {
        const parsedUserData = JSON.parse(storedSession);
        setUserData(parsedUserData);
        setIsAuthenticated(true);
      } else {
        setUserData(null);
        setIsAuthenticated(false);
      }
    }
  }, [session]);
  

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userSession', JSON.stringify(userData));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('userSession');
      setIsAuthenticated(false);
    }
  }, [userData]);

  const loginWithGoogle = async () => {
    await signIn('google', { redirect: false });
    router.push('/');
  };

  const logout = async () => {
    await signOut();
    localStorage.removeItem('userSession');
    setUserData(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, isAuthenticated, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

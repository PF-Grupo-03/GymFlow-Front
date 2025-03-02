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
    // Manejo de sesión con NextAuth
    if (session?.user) {
      const userSession: IUserSession = {
        id: session.user.id,
        name: session.user.name!,
        email: session.user.email!,
        image: session.user.image!,
      };
      setUserData(userSession);
      setIsAuthenticated(true);
      localStorage.setItem('userSession', JSON.stringify(userSession));
    } else {
      // Si no hay sesión en NextAuth, revisar localStorage
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

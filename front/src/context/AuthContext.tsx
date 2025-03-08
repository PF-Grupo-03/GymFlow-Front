'use client';

import { IUserSession } from '@/interfaces/IUserSession';
import { createContext, useContext, useEffect, useState } from 'react';

export interface AuthContextProps {
  userData: IUserSession | null;
  setUserData: (userData: IUserSession | null) => void;
  isAuthenticated: boolean;
  userId: string | null;
  userEmail: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
  userData: null,
  setUserData: () => {},
  isAuthenticated: false,
  userId: null,
  userEmail: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const userId = userData?.user?.id || null;
  const userEmail = userData?.user?.email || null;

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      try {
        const parsedUserData: IUserSession = JSON.parse(userSession);

        if (parsedUserData.user?.id && parsedUserData.user?.email) {
          setUserData(parsedUserData);
          setIsAuthenticated(true);
        } else {
          console.error('Estructura inválida en localStorage:', parsedUserData);
          localStorage.removeItem('userSession');
        }
      } catch (error) {
        console.error('Error al parsear userSession:', error);
        localStorage.removeItem('userSession');
      }
    }
  }, []);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userSession', JSON.stringify(userData));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('userSession');
      setIsAuthenticated(false);
    }
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{ userData, setUserData, isAuthenticated, userId, userEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

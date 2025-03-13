'use client';

import { IUserSession } from '@/interfaces/IUserSession';
import { createContext, useContext, useEffect, useState } from 'react';

export interface AuthContextProps {
  userData: IUserSession | null;
  setUserData: (userData: IUserSession | null) => void;
  isAuthenticated: boolean;
  userId: string | null;
  userEmail: string | null;
  token: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
  userData: null,
  setUserData: () => {},
  isAuthenticated: false,
  userId: null,
  userEmail: null,
  token: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const userId = userData?.user?.id || null;
  const userEmail = userData?.user?.email || null;

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      try {
        const parsedUserData: IUserSession = JSON.parse(userSession);
        console.log(
          'esto es el parsed de la respuesta del back:',
          parsedUserData
        );
        if (
          parsedUserData.user?.id &&
          parsedUserData.user?.email &&
          parsedUserData.token
        ) {
          setUserData(parsedUserData);
          setToken(parsedUserData.token.token);
          setIsAuthenticated(true);
        } else {
          console.error(
            'Estructura invÃ¡lida en localStorage:',
            parsedUserData
          );
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
      setToken(userData.token.token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('userSession');
      setToken(null);
      setIsAuthenticated(false);
    }
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        isAuthenticated,
        userId,
        userEmail,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

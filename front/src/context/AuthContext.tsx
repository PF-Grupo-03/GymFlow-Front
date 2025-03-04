'use client';

import { IUserSession } from '@/interfaces/IUserSession';
import { createContext, useContext, useEffect, useState } from 'react';

export interface AuthContextProps {
  userData: IUserSession | null;
  setUserData: (userData: IUserSession | null) => void;
  isAuthenticated: boolean;
  userId: string | null; // Nuevo: userId
  userEmail: string | null; // Nuevo: userEmail
}

export const AuthContext = createContext<AuthContextProps>({
  userData: null,
  setUserData: () => {},
  isAuthenticated: false,
  userId: null, // Nuevo: valor inicial
  userEmail: null, // Nuevo: valor inicial
});

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Nuevo: Extraer userId y userEmail de userData
  const userId = userData?.user.id || null;
  const userEmail = userData?.user.email || null;

  useEffect(() => {
    // Revisar si existe una sesión en el localStorage
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      const parsedUserData = JSON.parse(userSession);
      setUserData(parsedUserData);
      setIsAuthenticated(true); // Si existe la sesión, el usuario está autenticado
    }
  }, []);

  useEffect(() => {
    // Actualiza localStorage si cambia userData
    if (userData) {
      localStorage.setItem('userSession', JSON.stringify(userData));
      setIsAuthenticated(true); // Si se tiene userData, es considerado autenticado
    } else {
      localStorage.removeItem('userSession');
      setIsAuthenticated(false); // Si no hay userData, no está autenticado
    }
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{ userData, setUserData, isAuthenticated, userId, userEmail }} // Nuevo: agregar userId y userEmail
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

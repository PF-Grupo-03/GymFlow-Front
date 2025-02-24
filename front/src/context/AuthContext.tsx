'use client';
import { IUserSession } from '@/interfaces/IUserSession';
import { createContext, useContext, useEffect, useState } from 'react';

export interface AuthContextProps {
  userData: IUserSession | null;
  setUserData: (userData: IUserSession | null) => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  userData: null,
  setUserData: () => {},
  isAuthenticated: false,
});

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    <AuthContext.Provider value={{ userData, setUserData, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

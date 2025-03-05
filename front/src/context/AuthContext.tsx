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

  // Nuevo: Extraer userId y userEmail de userData (con verificación)
  const userId = userData?.user?.id || null;
  const userEmail = userData?.user?.email || null;

  useEffect(() => {
    // Revisar si existe una sesión en el localStorage
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      try {
        const parsedUserData = JSON.parse(userSession);

        // Adaptar la estructura de parsedUserData a IUserSession
        const adaptedUserData: IUserSession = {
          token: '', // Si no tienes un token, puedes dejarlo como cadena vacía
          user: {
            id: parsedUserData.id,
            nameAndLastName: parsedUserData.nameAndLastName,
            bDate: parsedUserData.bDate,
            email: parsedUserData.email,
            password: parsedUserData.password,
            confirmPassword: '', // Si no tienes confirmPassword, déjalo como cadena vacía
            phone: parsedUserData.phone,
            address: parsedUserData.address,
            role: parsedUserData.role,
          },
        };

        // Verificar si adaptedUserData tiene la estructura esperada
        if (adaptedUserData.user?.id && adaptedUserData.user?.email) {
          setUserData(adaptedUserData);
          setIsAuthenticated(true); // Si existe la sesión, el usuario está autenticado
        } else {
          // Si no tiene la estructura esperada, limpiar el localStorage
          console.error('Estructura de userSession inválida:', parsedUserData);
          localStorage.removeItem('userSession');
        }
      } catch (error) {
        console.error('Error al parsear userSession:', error);
        localStorage.removeItem('userSession');
      }
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

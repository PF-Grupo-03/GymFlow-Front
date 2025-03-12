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

<<<<<<< HEAD
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
=======
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
>>>>>>> fad5864993e575b22134fb4b3cff5d5a8e529d5a
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const userId = userData?.user?.id || null;
  const userEmail = userData?.user?.email || null;

  useEffect(() => {
<<<<<<< HEAD
    const userSession = localStorage.getItem("userSession");
=======
    const userSession = localStorage.getItem('userSession');
>>>>>>> fad5864993e575b22134fb4b3cff5d5a8e529d5a
    if (userSession) {
      try {
        const parsedUserData: IUserSession = JSON.parse(userSession);

        if (parsedUserData.user?.id && parsedUserData.user?.email) {
          setUserData(parsedUserData);
          setIsAuthenticated(true);
        } else {
<<<<<<< HEAD
          console.error("Estructura inválida en localStorage:", parsedUserData);
          localStorage.removeItem("userSession");
        }
      } catch (error) {
        console.error("Error al parsear userSession:", error);
        localStorage.removeItem("userSession");
=======
          console.error('Estructura inválida en localStorage:', parsedUserData);
          localStorage.removeItem('userSession');
        }
      } catch (error) {
        console.error('Error al parsear userSession:', error);
        localStorage.removeItem('userSession');
>>>>>>> fad5864993e575b22134fb4b3cff5d5a8e529d5a
      }
    }
  }, []);

  useEffect(() => {
    if (userData) {
<<<<<<< HEAD
      localStorage.setItem("userSession", JSON.stringify(userData));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("userSession");
=======
      localStorage.setItem('userSession', JSON.stringify(userData));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('userSession');
>>>>>>> fad5864993e575b22134fb4b3cff5d5a8e529d5a
      setIsAuthenticated(false);
    }
  }, [userData]);

  return (
<<<<<<< HEAD
    <AuthContext.Provider value={{ userData, setUserData, isAuthenticated, userId, userEmail }}>
=======
    <AuthContext.Provider
      value={{ userData, setUserData, isAuthenticated, userId, userEmail }}
    >
>>>>>>> fad5864993e575b22134fb4b3cff5d5a8e529d5a
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

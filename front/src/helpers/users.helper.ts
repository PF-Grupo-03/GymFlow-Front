'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface MemberData {
  memberShipType: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface UserData {
  id: string;
  nameAndLastName: string;
  email: string;
  phone: string;
  address: string;
  dni: string;
  role: string;
  member?: MemberData | null;
}

const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userSession = localStorage.getItem('userSession');
        if (!userSession) throw new Error('No hay sesión activa.');

        const userParsed = JSON.parse(userSession);
        const userEmail = userParsed.user.email;

        const response = await fetch(`${API_URL}/users/email/${userEmail}`);
        if (!response.ok)
          throw new Error('Error al obtener los datos del usuario.');

        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, loading, error };
};

export default useUserData;

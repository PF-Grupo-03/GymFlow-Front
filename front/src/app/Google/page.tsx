'use client';

import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { NEXT_PUBLIC_API_URL } from '../config/envs';
import { useAuth } from '@/context/AuthContext';
import { ClipLoader } from 'react-spinners';

const Google = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <GoogleContent />
    </Suspense>
  );
};

const GoogleContent = () => {
  const searchParams = useSearchParams();
  const userToken = searchParams.get('token');
  const userId = searchParams.get('id');
  const { setUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!userId || !userToken) {
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${NEXT_PUBLIC_API_URL}/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );

        const user = response.data;
        const formattedUserData = {
          user,
          token: {
            withoutPasswordAndRole: user, // Ajuste a la estructura de IUserSession
            token: userToken,
          },
        };

        setUserData(formattedUserData);
        router.push('/');
      } catch (error) {
        console.error('❌ Error al obtener usuario:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId, userToken, setUserData, router]);

  if (isLoading) {
    return <ClipLoader color="#36D7B7" size={50} />;
  }

  return (
    <div>
      <p>Token: {userToken}</p>
      <p>ID: {userId}</p>
    </div>
  );
};

export default Google;

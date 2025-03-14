"use client"

import { ClipLoader } from "react-spinners";
import { NEXT_PUBLIC_API_URL } from "../config/envs";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";

const Google = () => (
  <Suspense fallback={<ClipLoader color="#36D7B7" size={50} />}>
    <GoogleContent />
  </Suspense>
);

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
        const { data } = await axios.get(`${NEXT_PUBLIC_API_URL}/users/${userId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        setUserData({
          user: data,
          token: {
            withoutPasswordAndRole: data,
            token: userToken,
          },
        });
        router.push('/');
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId, userToken, setUserData, router]);

  if (isLoading) return <ClipLoader color="#36D7B7" size={50} />;

  return (
    <div>
      <p>Token: {userToken}</p>
      <p>ID: {userId}</p>
    </div>
  );
};

export default Google;
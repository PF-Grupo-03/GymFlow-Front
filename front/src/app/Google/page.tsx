"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { NEXT_PUBLIC_API_URL } from "../config/envs";
import { useAuth } from "@/context/AuthContext";
import { ClipLoader } from "react-spinners";

const Google = () => {
  return (
    <Suspense fallback={<ClipLoader color="#36D7B7" size={50} />}>
      <GoogleContent />
    </Suspense>
  );
};

const GoogleContent = () => {
  const searchParams = useSearchParams();
  const userToken = searchParams.get("token");
  const userId = searchParams.get("id");
  const { setUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (userId && userToken) {
      console.log("userId", userId);
      console.log("userToken", userToken);
      axios
        .get(`${NEXT_PUBLIC_API_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          const user = response.data;
          setUserData({ user, token: userToken });
          router.push("/");
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error en la respuesta del servidor:", error.response.data);
          } else if (error.request) {
            console.error("No se recibió respuesta del servidor:", error.request);
          } else {
            console.error("Error al configurar la solicitud:", error.message);
          }
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 500); // Pequeño delay para suavizar la transición
        });
    } else {
      setIsLoading(false);
    }
  }, [userId, userToken, setUserData, router]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <ClipLoader color="#36D7B7" size={50} />
      </div>
    );
  }

  return (
    <div>
      <p>Token: {userToken}</p>
      <p>ID: {userId}</p>
    </div>
  );
};

export default Google;

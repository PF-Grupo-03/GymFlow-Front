"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { NEXT_PUBLIC_API_URL } from "../config/envs";
import { useAuth } from "@/context/AuthContext";
import { ClipLoader } from "react-spinners";

const Google = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
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
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.error(
              "Error en la respuesta del servidor:",
              error.response.data
            );
            console.error("Código de estado:", error.response.status);
            console.error("Encabezados:", error.response.headers);
          } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error(
              "No se recibió respuesta del servidor:",
              error.request
            );
          } else {
            // Algo más causó el error
            console.error("Error al configurar la solicitud:", error.message);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
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

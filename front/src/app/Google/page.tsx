"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NEXT_PUBLIC_API_URL } from "../config/envs";
import { useAuth } from "@/context/AuthContext";
import { ClipLoader } from "react-spinners";

const Google = () => {
  return <GoogleContent />;
};

const GoogleContent = () => {
  const searchParams = useSearchParams();
  const userToken = searchParams.get("token");
  const userId = searchParams.get("id");
  const { setUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("Iniciando GoogleContent");
    console.log("userId:", userId);
    console.log("userToken:", userToken);

    if (userId && userToken) {
      console.log("Realizando petición a la API...");
      axios
        .get(`${NEXT_PUBLIC_API_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          console.log("Respuesta recibida de la API:", response.data);
          const user = response.data;
          setUserData({ user, token: userToken });
          console.log("Usuario seteado correctamente");
          router.push("/");
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        })
        .finally(() => {
          console.log("Finalizando carga");
          setTimeout(() => setIsLoading(false), 500);
        });
    } else {
      console.log("Faltan userId o userToken, no se hace la petición");
      setIsLoading(false);
    }
  }, [userId, userToken, setUserData, router]);

  if (isLoading) {
    console.log("Mostrando spinner");
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader color="#36D7B7" size={50} />
      </div>
    );
  }

  console.log("Finalizado GoogleContent, sin contenido visible");
  return null;
};

export default Google;

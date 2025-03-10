"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthCallback = () => {
  const { setUserData } = useAuth(); // Accede al setter de userData en el contexto
  const router = useRouter();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        // Llamada al backend para registrar o autenticar al usuario
        const response = await fetch("http://localhost:3001/auth/google/redirect", {
          method: "GET",
          credentials: "include", // Asegúrate de incluir las cookies si usas autenticación basada en ellas
        });

        const data = await response.json();

        if (data.user) {
          // Guarda el usuario en el contexto de la aplicación (AuthContext)
          setUserData(data.user);

          // Ahora guardamos la sesión en localStorage
          localStorage.setItem("userSession", JSON.stringify(data));

          // Verifica si el perfil está completo (verifica si faltan campos)
          const { dni, phone, address } = data.user;

          // Si falta algún campo, redirige a la vista de completar perfil
          if (!dni || !phone || !address) {
            router.push("/complete-profile");
          } else {
            // Si el perfil está completo, redirige al dashboard u otra página principal
            router.push("/dashboard");
          }
        } else {
          console.error("Error al autenticar el usuario:", data.message);
        }
      } catch (error) {
        console.error("Error de autenticación:", error);
      }
    };

    authenticateUser();
  }, [setUserData, router]);

  return <p>Cargando...</p>;
};

export default AuthCallback;

"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { NEXT_PUBLIC_API_URL } from "../config/envs";
import { useRouter, useSearchParams } from "next/navigation";

const CompleteProfile = () => {
  const { userData, setUserData } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id"); // Se obtiene el id desde la URL
  console.log(userId);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    dni: "",
    phone: "",
    address: "",
  });

  // Obtener la información del usuario al montar el componente
  useEffect(() => {
    if (!userId) {
      console.error("No se encontró el id en la URL.");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/users/${userId}`);
        if (!res.ok) throw new Error("Error al obtener los datos del usuario");
        const data = await res.json();

        // Actualizar el contexto con los datos obtenidos
        setUserData({ user: data, token: userData?.token || "" });

        // Prellenar el formulario con los datos del usuario
        setFormData({
          dni: data.dni || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (error) {
        if (error instanceof Error) {
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.error("An unknown error occurred");
          }
        } else {
          console.error("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, setUserData, userData?.token]);

  // Controlador para actualizar el estado local del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Función que maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      console.error("No se ha encontrado el ID del usuario en la URL.");
      return;
    }
  
    const updatedFormData = {
      ...formData,
      role: "USER_BASIC", // 👈 Ajusta este valor según lo que corresponda
    };
  
    console.log("📤 Enviando datos:", JSON.stringify(updatedFormData));
  
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/users/update-google/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFormData),
        }
      );
  
      console.log("🔍 Respuesta del servidor (status):", response.status);
  
      const data = await response.json();
      console.log("📩 Respuesta del servidor (body):", data);
  
      if (!response.ok) throw new Error(data.message || "Error al actualizar el perfil");
  
      // Obtener la información actualizada del usuario
      const resUser = await fetch(`${NEXT_PUBLIC_API_URL}/users/${userId}`);
      if (!resUser.ok) throw new Error("Error al obtener el usuario actualizado");
      const updatedUser = await resUser.json();
  
      console.log("✅ Usuario actualizado correctamente:", updatedUser);
  
      // Actualizar el contexto con el usuario actualizado
      setUserData({ user: updatedUser, token: userData?.token || "" });
  
      // Redirigir al usuario
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ Error en handleSubmit:", error.message);
      } else {
        console.error("❌ Error en handleSubmit:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="dni"
        value={formData.dni}
        onChange={handleInputChange}
        placeholder="DNI"
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Phone"
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Address"
      />
      <button type="submit">Guardar perfil</button>
    </form>
  );
};

export default CompleteProfile;

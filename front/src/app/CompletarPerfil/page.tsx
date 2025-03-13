"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { NEXT_PUBLIC_API_URL } from "../config/envs";
import { useRouter, useSearchParams } from "next/navigation";

const CompleteProfileContent = () => {
  const { userData, setUserData } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id"); // Se obtiene el id desde la URL
  const userToken = searchParams.get("token");
  console.log("userId:", userId);
  console.log("userToken:", userToken);

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    dni: "",
    phone: "",
    address: "",
    role: "",
  });

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

        setUserData({ user: data, token: userData?.token || "" });

        setFormData({
          dni: data.dni || "",
          phone: data.phone || "",
          address: data.address || "",
          role: data.role || "",
        });
      } catch (error) {
        console.error(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, setUserData, userData?.token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      console.error("No se ha encontrado el ID del usuario en la URL.");
      return;
    }

    const updatedFormData = { ...formData };

    console.log("📤 Enviando datos:", JSON.stringify(updatedFormData));

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/users/update-google/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      console.log("🔍 Respuesta del servidor (status):", response.status);

      const data = await response.json();
      console.log("📩 Respuesta del servidor (body):", data);

      if (!response.ok)
        throw new Error(data.message || "Error al actualizar el perfil");

      const resUser = await fetch(`${NEXT_PUBLIC_API_URL}/users/${userId}`);
      if (!resUser.ok)
        throw new Error("Error al obtener el usuario actualizado");
      const updatedUser = await resUser.json();

      console.log("✅ Usuario actualizado correctamente:", updatedUser);

      setUserData({ user: updatedUser, token: userData?.token || "" });

      router.push("/");
    } catch (error) {
      console.error(
        "❌ Error en handleSubmit:",
        error instanceof Error ? error.message : error
      );
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

      <select name="role" value={formData.role} onChange={handleInputChange}>
        <option value="">Elige tu rol</option>
        <option value="USER_MEMBER">Cliente</option>
        <option value="USER_TRAINING">Entrenador</option>
      </select>

      <button type="submit">Guardar perfil</button>
    </form>
  );
};

const CompleteProfile = () => {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <CompleteProfileContent />
    </Suspense>
  );
};

export default CompleteProfile;

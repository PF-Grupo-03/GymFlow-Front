"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { NEXT_PUBLIC_API_URL } from "../config/envs";
import { useRouter, useSearchParams } from "next/navigation";
import "../../app/globals.css";

const CompleteProfileContent = () => {
  const { userData, setUserData } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const userToken = searchParams.get("token");

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
          headers: { "Content-Type": "application/json" },
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

      setUserData({ user: updatedUser, token: userToken || "" });

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
    <div className="relative flex justify-center items-center min-h-screen h-[90vh] -mt-5 pb-8">
      <div className="relative bg-secondary whiteShadow p-12 w-[420px] h-[400px] rounded-tl-lg rounded-br-lg shadow-lg mt-12">
        <h2 className="text-primary text-3xl font-holtwood text-center mb-8">
          COMPLETAR PERFIL
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-x-6 gap-y-4"
        >
          <div className="flex flex-col">
            <label className="text-primary font-holtwood text-sm">DNI:</label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleInputChange}
              placeholder="Ej: 12345678"
              className="border-2 border-tertiary p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-primary font-holtwood text-sm">
              Teléfono:
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+54 XXX XXX XXXX"
              className="border-2 border-tertiary p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-primary font-holtwood text-sm">
              Dirección:
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Dirección"
              className="border-2 border-tertiary p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-primary font-holtwood text-sm">Rol:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="border-2 border-tertiary p-2 rounded-md"
            >
              <option value="">Elige tu rol</option>
              <option value="USER_MEMBER">Cliente</option>
              <option value="USER_TRAINING">Entrenador</option>
            </select>
          </div>

          <button
            type="submit"
            className="col-span-2 bg-tertiary text-primary font-holtwood py-2 px-4 rounded-md hover:shadow-md transition mx-auto"
          >
            Guardar perfil
          </button>
        </form>
      </div>
    </div>
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

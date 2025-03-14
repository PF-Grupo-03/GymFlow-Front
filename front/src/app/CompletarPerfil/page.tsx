"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { NEXT_PUBLIC_API_URL } from "../config/envs";
import { useRouter, useSearchParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const CompleteProfileContent = () => {
  const { setUserData } = useAuth();
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
    if (!userId || !userToken) {
      console.error("Faltan parámetros en la URL.");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `${NEXT_PUBLIC_API_URL}/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );

        setUserData({
          user: data,
          token: {
            withoutPasswordAndRole: data,
            token: userToken,
          },
        });

        setFormData({
          dni: data.dni || "",
          phone: data.phone || "",
          address: data.address || "",
          role: data.role || "",
        });
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, userToken, setUserData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      console.error("ID de usuario no encontrado en la URL.");
      return;
    }

    try {
      const { data } = await axios.patch(
        `${NEXT_PUBLIC_API_URL}/users/update-google/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setUserData({ user: data.userWithoutPassword, token: data.token });
      router.push("/");
    } catch (error) {
      console.error("Error en la actualización del perfil:", error);
    }
  };

  if (loading) return <ClipLoader color="#36D7B7" size={50} />;

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

const CompleteProfile = () => (
  <Suspense fallback={<ClipLoader color="#36D7B7" size={50} />}>
    <CompleteProfileContent />
  </Suspense>
);

export default CompleteProfile;

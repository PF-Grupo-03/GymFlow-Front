"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { NEXT_PUBLIC_API_URL } from "../config/envs";
import { useRouter, useSearchParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import "../../app/globals.css";

const CompleteProfileContent = () => {
  const { setUserData } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const userToken = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    dni: "",
    phone: "",
    address: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    dniError: "",
    phoneError: "",
    addressError: "",
    roleError: "",
  });

  useEffect(() => {
    if (!userId || !userToken) {
      setError("Faltan parámetros en la URL.");
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
        console.log("Esta es la respuesta del back:", data);
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
        setError("Error al obtener datos del usuario.");
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

    // Realizar validaciones en tiempo real
    if (name === "dni") {
      const dniValid = /^[0-9]{7,8}$/.test(value);
      setErrors((prev) => ({
        ...prev,
        dniError: dniValid ? "" : "El DNI debe contener entre 7 y 8 dígitos numéricos.",
      }));
    }

    if (name === "phone") {
      const phoneValid = /^\+?\d{7,15}$/.test(value);
      setErrors((prev) => ({
        ...prev,
        phoneError: phoneValid ? "" : "El teléfono debe contener solo números y puede incluir un prefijo internacional.",
      }));
    }

    if (name === "address") {
      setErrors((prev) => ({
        ...prev,
        addressError: value.trim() === "" ? "La dirección no puede estar vacía." : "",
      }));
    }

    if (name === "role") {
      setErrors((prev) => ({
        ...prev,
        roleError: value ? "" : "Debe seleccionar un rol.",
      }));
    }
  };

  const validateForm = () => {
    if (errors.dniError || errors.phoneError || errors.addressError || errors.roleError) {
      return "Por favor, corrige los errores antes de enviar el formulario.";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!userId) {
      setError("ID de usuario no encontrado en la URL.");
      return;
    }

    setLoading(true);
    setError("");

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

      setUserData({
        user: data.userWithoutPassword,
        token: {
          withoutPasswordAndRole: data.userWithoutPassword,
          token: userToken!,
        },
      });
      router.push("/");
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(
          error.response.data.message || "Error en la actualización del perfil."
        );
      } else {
        setError("Error en la actualización del perfil. Inténtalo nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ClipLoader color="#36D7B7" size={50} />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

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
            {errors.dniError && <div className="text-red-500 text-xs">{errors.dniError}</div>}
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
            {errors.phoneError && <div className="text-red-500 text-xs">{errors.phoneError}</div>}
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
            {errors.addressError && <div className="text-red-500 text-xs">{errors.addressError}</div>}
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
            {errors.roleError && <div className="text-red-500 text-xs">{errors.roleError}</div>}
          </div>

          {error && <div className="text-red-500 text-center">{error}</div>}

          <button
            type="submit"
            className="col-span-2 bg-tertiary text-primary font-holtwood py-2 px-4 rounded-md hover:shadow-md transition mx-auto"
          >
            Actualizar Perfil
          </button>
        </form>
      </div>
    </div>
  );
};

export default function CompleteProfile() {
  return (
    <Suspense fallback={<ClipLoader color="#36D7B7" size={50} />}>
      <CompleteProfileContent />
    </Suspense>
  );
}

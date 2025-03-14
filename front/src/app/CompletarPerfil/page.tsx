/* eslint-disable @typescript-eslint/no-unused-vars */
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
      alert("Faltan parámetros en la URL."); // Mostrar alerta
      setLoading(false);
      return;
    }
    setLoading(false); // Ya no necesitamos cargar datos iniciales
  }, [userId, userToken]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validaciones en tiempo real
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
    if (!formData.dni || !formData.phone || !formData.address || !formData.role) {
      return "Todos los campos son obligatorios.";
    }
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
      alert(validationError); // Mostrar alerta con el error de validación
      return;
    }

    if (!userId) {
      setError("ID de usuario no encontrado en la URL.");
      alert("ID de usuario no encontrado en la URL."); // Mostrar alerta con el error
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
      console.log("Respuesta del backend después del PATCH:", data);

      // Setear los datos del usuario después de un PATCH exitoso
      setUserData({
        user: data.userWithoutPassword || data, // Ajusta según la respuesta del backend
        token: {
          withoutPasswordAndRole: data.userWithoutPassword || data,
          token: userToken!,
        },
      });
      router.push("/");
    } catch (error: any) {
      console.error("Error completo del backend:", error); // Muestra el error completo en la consola

      if (error.response) {
        // Si el backend devuelve una respuesta con un mensaje de error
        console.error("Respuesta del backend:", error.response.data); // Muestra la respuesta del backend
        const errorMessage =
          error.response.data.message || "Error en la actualización del perfil.";
        setError(errorMessage);
        alert(errorMessage); // Mostrar alerta con el mensaje de error del backend
      } else if (error.request) {
        // Si la solicitud fue hecha pero no se recibió respuesta
        console.error("No se recibió respuesta del backend:", error.request);
        const errorMessage =
          "No se recibió respuesta del servidor. Inténtalo nuevamente.";
        setError(errorMessage);
        alert(errorMessage);
      } else {
        // Si ocurrió un error al hacer la solicitud
        console.error("Error al hacer la solicitud:", error.message);
        const errorMessage =
          "Error en la actualización del perfil. Inténtalo nuevamente.";
        setError(errorMessage);
        alert(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ClipLoader color="#36D7B7" size={50} />;

  return (
    <div className="relative flex justify-center items-center min-h-screen h-[90vh] -mt-5 pb-8">
      <div className="relative bg-secondary whiteShadow p-12 w-[420px] h-[400px] rounded-tl-lg rounded-br-lg shadow-lg mt-12">
        <h2 className="text-primary text-3xl font-holtwood text-center mb-8">
          COMPLETAR PERFIL
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-4">
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
            {errors.dniError && (
              <div className="text-red-500 text-xs">{errors.dniError}</div>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-primary font-holtwood text-sm">Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+54 XXX XXX XXXX"
              className="border-2 border-tertiary p-2 rounded-md"
            />
            {errors.phoneError && (
              <div className="text-red-500 text-xs">{errors.phoneError}</div>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-primary font-holtwood text-sm">Dirección:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Dirección"
              className="border-2 border-tertiary p-2 rounded-md"
            />
            {errors.addressError && (
              <div className="text-red-500 text-xs">{errors.addressError}</div>
            )}
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
            {errors.roleError && (
              <div className="text-red-500 text-xs">{errors.roleError}</div>
            )}
          </div>

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
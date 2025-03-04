"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Para redirigir después de la actualización

const CompletarPerfil = () => {
  const router = useRouter();
  
  // Estado para controlar si estamos en el cliente
  const [isClient, setIsClient] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    bDate: "",
    address: "",
    phone: "",
  });

  const [message, setMessage] = useState<string | null>(null);

  // Efecto para asegurarse de que el código solo se ejecute en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Efecto para obtener el `id` de los parámetros de la URL solo en el cliente
  useEffect(() => {
    if (isClient) {
      const searchParams = new URLSearchParams(window.location.search);
      setId(searchParams.get("id"));
    }
  }, [isClient]);

  useEffect(() => {
    if (id) {
      axios
        .get(`/users/${id}`)
        .then((response) => {
          const user = response.data;
          setFormData({
            bDate: user.bDate || "",
            address: user.address || "",
            phone: user.phone || "",
          });
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
          setMessage("Error al cargar los datos del usuario");
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/users/update-google/${id}`, formData);
      if (response.status === 200) {
        setMessage("Perfil actualizado con éxito");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setMessage("Error al actualizar el perfil");
    }
  };

  return (
    <div className="container">
      <h1>Completar Perfil</h1>
      {message && <div>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bDate">Fecha de nacimiento:</label>
          <input
            type="date"
            id="bDate"
            name="bDate"
            value={formData.bDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="address">Dirección:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default CompletarPerfil;

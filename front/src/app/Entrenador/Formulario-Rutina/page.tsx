"use client";

import { muscles } from "@/data/muscles";
import { getUsers } from "@/helpers/getUsers";
import { IUser } from "@/interfaces/IUserSession";
import { useState, useEffect } from "react";

const muscleMap = muscles.reduce((acc, muscle) => {

  const formattedName = muscle
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  acc[formattedName] = muscle;
  return acc;
}, {} as Record<string, string>);

const FormRutina = () => {
  const [usuarios, setUsuarios] = useState<IUser[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [exercises, setExercises] = useState<any[]>([]);

  const handleMuscleSelect = async (formattedMuscle: string) => {
    const originalMuscle = muscleMap[formattedMuscle]; 
    setSelectedMuscle(formattedMuscle); 

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/excercise/muscle/${originalMuscle}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
      );
      if (!response.ok) throw new Error("Error al obtener los ejercicios");
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error("Error al obtener ejercicios:", error);
    }
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuarios = await getUsers();
        setUsuarios(usuarios);
      } catch (error) {
        setError((error as any).message);
        console.log(error);
      } finally {
        setCargando(false);
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <div>
      <form>
        <label>Elegir Cliente:</label>
        {cargando ? (
          <p>Cargando usuarios...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <select>
            <option value="">Seleccione un usuario</option>
            {usuarios.map((usuario: IUser) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nameAndLastName}
              </option>
            ))}
          </select>
        )}

        <label>Elegir el día:</label>
        <select>
          <option>Lunes</option>
          <option>Martes</option>
          <option>Miércoles</option>
          <option>Jueves</option>
          <option>Viernes</option>
          <option>Sábado</option>
          <option>Domingo</option>
        </select>

        <div>
          <h2>Selecciona un músculo:</h2>
          {Object.keys(muscleMap).map((formattedMuscle) => (
            <div key={formattedMuscle}>
              <input
                type="radio"
                id={formattedMuscle}
                name="muscle"
                value={formattedMuscle}
                checked={selectedMuscle === formattedMuscle}
                onChange={() => handleMuscleSelect(formattedMuscle)}
              />
              <label htmlFor={formattedMuscle}>{formattedMuscle}</label>
            </div>
          ))}

          <h2>Ejercicios para {selectedMuscle}</h2>
          <ul>
            {exercises.map((exercise, index) => (
              <li key={index}>{exercise.name}</li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default FormRutina;

"use client";

import { useAuth } from "@/context/AuthContext";
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
  const [error, setError] = useState<string | null>(null);

  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [series, setSeries] = useState<number>(0);
  const [repetitions, setRepetitions] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        if (!token) {
          throw new Error("No hay un token de autenticación disponible.");
        }

        const usuarios = await getUsers(token);
        setUsuarios(usuarios);
        setError(null); // Limpiar el error si la solicitud es exitosa
      } catch (error) {
        setError((error as Error).message);
        console.error(error);
      } finally {
        setCargando(false);
      }
    };

    fetchUsuarios();
  }, [token]);

  const handleMuscleSelect = async (formattedMuscle: string) => {
    const originalMuscle = muscleMap[formattedMuscle];
    setSelectedMuscle(formattedMuscle);

    try {
      if (!token) {
        throw new Error("No hay un token de autenticación disponible.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/exercise/muscle/${originalMuscle}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los ejercicios");
      }

      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error("Error al obtener ejercicios:", error);
      setError((error as Error).message);
    }
  };

  const handleSaveRoutine = async () => {
    try {
      if (!token) {
        throw new Error("No hay un token de autenticación disponible.");
      }

      if (!selectedDay || !selectedExercise || !series || !repetitions || !selectedUserId) {
        throw new Error("Por favor, complete todos los campos.");
      }

      const routineData = {
        day: selectedDay.toUpperCase(),
        userId: selectedUserId,
        exercises: [
          {
            exerciseId: selectedExercise,
            series: series,
            repetitions: repetitions,
          },
        ],
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/routines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(routineData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar la rutina");
      }

      const result = await response.json();
      console.log("Rutina guardada:", result);
      alert("Rutina guardada con éxito!");
    } catch (error) {
      console.error("Error al guardar la rutina:", error);
      setError((error as Error).message);
      alert((error as Error).message);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen -mt-5 pb-8">
      <div className="relative bg-secondary p-8 mt-12 rounded-2xl whiteShadow w-full max-w-xl">
        <h2 className="text-primary text-3xl font-holtwood text-center mb-6">
          CREAR RUTINA
        </h2>

        <form className="flex flex-col gap-4">
          <div>
            <label className="text-primary font-holtwood text-sm">
              Elegir Cliente:
            </label>
            {cargando ? (
              <p>Cargando usuarios...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <select
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full border-2 border-tertiary p-2 rounded-md"
              >
                <option value="">Seleccione un usuario</option>
                {usuarios.map((usuario: IUser) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nameAndLastName}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="text-primary font-holtwood text-sm">
              Elegir el día:
            </label>
            <select
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full border-2 border-tertiary p-2 rounded-md"
            >
              <option value="">Seleccione un día</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>
          </div>

          <div>
            <h2 className="text-primary font-holtwood text-sm mb-2">
              Selecciona un músculo:
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(muscleMap).map((formattedMuscle) => (
                <div key={formattedMuscle} className="flex items-center">
                  <input
                    type="radio"
                    id={formattedMuscle}
                    name="muscle"
                    value={formattedMuscle}
                    checked={selectedMuscle === formattedMuscle}
                    onChange={() => handleMuscleSelect(formattedMuscle)}
                    className="mr-2"
                  />
                  <label htmlFor={formattedMuscle} className="text-primary">
                    {formattedMuscle}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-primary font-holtwood text-sm">
              Selecciona un ejercicio:
            </label>
            <select
              value={selectedExercise || ""}
              onChange={(e) => setSelectedExercise(e.target.value)}
              className="w-full border-2 border-tertiary p-2 rounded-md"
            >
              <option value="">Seleccione un ejercicio</option>
              {exercises.map((exercise, index) => (
                <option key={index} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-primary font-holtwood text-sm">
                Series:
              </label>
              <input
                type="number"
                value={series}
                onChange={(e) => setSeries(Number(e.target.value))}
                min="0"
                className="w-full border-2 border-tertiary p-2 rounded-md"
              />
            </div>

            <div>
              <label className="text-primary font-holtwood text-sm">
                Repeticiones:
              </label>
              <input
                type="number"
                value={repetitions}
                onChange={(e) => setRepetitions(Number(e.target.value))}
                min="0"
                className="w-full border-2 border-tertiary p-2 rounded-md"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveRoutine}
            className="bg-tertiary text-primary font-holtwood py-2 px-4 rounded-md hover:shadow-md transition"
          >
            Guardar Rutina
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormRutina;
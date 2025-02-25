import React from "react";

const routineData = [
  {
    day: "Lunes",
    categories: ["Pierna"],
    exercises: [
      {
        id: "1",
        name: "Sentadillas",
        series: 4,
        repetitions: 12,
        category: "Pierna",
        gifUrl: "https://via.placeholder.com/50"
      },
      {
        id: "2",
        name: "Prensa de Piernas",
        series: 3,
        repetitions: 10,
        category: "Pierna",
        gifUrl: "https://via.placeholder.com/50"
      }
    ]
  },
  {
    day: "Martes",
    categories: ["Pecho", "Hombro", "Bíceps"],
    exercises: [
      {
        id: "3",
        name: "Press de Banca",
        series: 4,
        repetitions: 10,
        category: "Pecho",
        gifUrl: "https://via.placeholder.com/50"
      },
      {
        id: "4",
        name: "Elevaciones Laterales",
        series: 3,
        repetitions: 12,
        category: "Hombro",
        gifUrl: "https://via.placeholder.com/50"
      }
    ]
  },
  {
    day: "Miércoles",
    categories: ["Espalda", "Tríceps"],
    exercises: [
      {
        id: "5",
        name: "Dominadas",
        series: 4,
        repetitions: 8,
        category: "Espalda",
        gifUrl: "https://via.placeholder.com/50"
      },
      {
        id: "6",
        name: "Fondos en Paralelas",
        series: 3,
        repetitions: 12,
        category: "Tríceps",
        gifUrl: "https://via.placeholder.com/50"
      }
    ]
  }
];

const RoutineView = () => {
  return (
    <div className="min-h-screen p-6 text-white font-odor">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 underline">
          Mi Rutina - Marcos Cardozo
        </h1>

        <div className="flex flex-wrap justify-between gap-4">
          {routineData.map((day, index) => (
            <div key={index} className="flex-1 min-w-[45%] bg-gray-100 p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold text-gray-800 bg-orange-500 px-3 py-1 rounded">
                {day.day}
              </h2>

              <div className="mt-2">
                {day.categories.map((category, catIndex) => (
                  <span
                    key={catIndex}
                    className="text-sm font-semibold text-gray-900 bg-orange-300 px-2 py-1 rounded mr-2"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Listado de ejercicios */}
              <div className="mt-3 space-y-2">
                {day.exercises.length > 0 ? (
                  day.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="bg-gray-200 p-2 rounded flex items-center">
                      <div>
                        <p className="text-gray-800 font-semibold">{exercise.name}</p>
                        <p className="text-gray-600 text-sm">
                          {exercise.series} series x {exercise.repetitions} reps
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">No hay ejercicios asignados</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutineView;
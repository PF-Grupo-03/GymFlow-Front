import React from 'react';

const routineData = [
  {
    day: 'Lunes',
    categories: ['Pierna'],
    exercises: [
      {
        id: '1',
        name: 'Sentadillas',
        series: 4,
        repetitions: 12,
        category: 'Pierna',
      },
      {
        id: '2',
        name: 'Prensa de Piernas',
        series: 3,
        repetitions: 10,
        category: 'Pierna',
      },
    ],
  },
  {
    day: 'Martes',
    categories: ['Pecho', 'Hombro', 'Bíceps'],
    exercises: [
      {
        id: '3',
        name: 'Press de Banca',
        series: 4,
        repetitions: 10,
        category: 'Pecho',
      },
      {
        id: '4',
        name: 'Elevaciones Laterales',
        series: 3,
        repetitions: 12,
        category: 'Hombro',
      },
    ],
  },
  {
    day: 'Miércoles',
    categories: ['Espalda', 'Tríceps'],
    exercises: [
      {
        id: '5',
        name: 'Dominadas',
        series: 4,
        repetitions: 8,
        category: 'Espalda',
      },
      {
        id: '6',
        name: 'Fondos en Paralelas',
        series: 3,
        repetitions: 12,
        category: 'Tríceps',
      },
    ],
  },
];

const RoutineView = () => {
  return (
    <div className="flex justify-center items-center mt-5 mb-20 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 whiteShadow">
      <div className="bg-secondary p-6 sm:p-8 md:p-12 rounded-[10px] w-full max-w-4xl font-holtwood text-primary">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 underline">
          Mi Rutina - Marcos Cardozo
        </h1>

        <div className="flex flex-col gap-6">
          {routineData.map((day, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-3"
            >
              <h2 className="text-lg sm:text-xl font-bold text-primary bg-orange-500 px-3 py-1 rounded text-center">
                {day.day}
              </h2>

              {/* Categorías */}
              <div className="flex flex-wrap justify-center gap-2">
                {day.categories.map((category, catIndex) => (
                  <span
                    key={catIndex}
                    className="text-xs sm:text-sm font-semibold text-gray-900 bg-orange-300 px-2 py-1 rounded"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Ejercicios */}
              <div className="space-y-2">
                {day.exercises.length > 0 ? (
                  day.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="bg-gray-200 p-3 rounded">
                      <p className="text-primary font-semibold">
                        {exercise.name}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {exercise.series} series x {exercise.repetitions} reps
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic text-center">
                    No hay ejercicios asignados
                  </p>
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

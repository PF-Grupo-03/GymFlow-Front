"use client"

import React, { useState } from "react";

interface Room {
  id: string;
  name: string;
  peopleCount: number;
  maxCapacity: number;
}

const initialRoomsData: Room[] = [
  { id: "1", name: "Sala 1 - Musculación", peopleCount: 10 , maxCapacity: 15 },
  { id: "2", name: "Sala 2 - Musculación", peopleCount: 8, maxCapacity: 12 },
  { id: "3", name: "Sala 3 - Crossfit", peopleCount: 5, maxCapacity: 10 },
];

const TrainingRooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRoomsData);

  const handleCapacityChange = (id: string, newCapacity: number) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id
          ? { ...room, maxCapacity: newCapacity > 0 ? newCapacity : room.maxCapacity }
          : room
      )
    );
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold font-odor text-primary mb-4">Salas de Entrenamiento</h2>
      <div className="flex flex-wrap gap-4 justify-center ">
        {rooms.map((room) => {
          const availableSpaces = room.maxCapacity - room.peopleCount;

          return (
            <div
                 key={room.id} className="w-full sm:w-[30%] bg-secondary p-4 justify-center border border-primary rounded-lg shadow transition duration-300 
                  hover:bg-opacity-100 hover:scale-105 hover:shadow-2xl"
              >

              <h3 className="text-lg font-bold font-holtwood text-primary">{room.name}</h3>
              <p className="text-primary whitespace-nowrap font-odor overflow-hidden text-ellipsis">
                Personas: {room.peopleCount} / {room.maxCapacity}
              </p>
              <p className={`text-sm ${availableSpaces > 0 ? "text-green-500" : "text-red-500"}`}>
                Espacios disponibles: {availableSpaces > 0 ? availableSpaces : "¡Lleno!"}
              </p>
              
              {/* Input para modificar la capacidad máxima */}
              <div className="mt-2">
                <label className="text-sm text-primary">Capacidad Máxima:</label>
                <input
                  type="number"
                  value={room.maxCapacity}
                  onChange={(e) => handleCapacityChange(room.id, Number(e.target.value))}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrainingRooms;

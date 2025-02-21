'use client';
import { TimePickerComponentProps } from '@/interfaces/BookingInterface';
import { useState } from 'react';

const TimePickerComponent: React.FC<TimePickerComponentProps> = ({
  selectedDate,
  onSelectTime,
}) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generar horas de 00:00 a 23:00
  const availableHours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onSelectTime(time);
  };

  return (
    <div className="mt-6 flex flex-col items-center bg-secondary p-6 rounded-2xl shadow-md w-full max-w-lg">
      {selectedDate ? (
        <>
          <h2 className="text-2xl text-primary font-holtwood text-center mb-4">
            Seleccioná un horario
          </h2>
          <div className="grid grid-cols-4 gap-2 w-full">
            {availableHours.map((hour) => (
              <button
                key={hour}
                onClick={() => handleTimeSelect(hour)}
                className={`p-3 rounded-lg font-bold transition-all duration-200 ${
                  selectedTime === hour
                    ? 'bg-tertiary text-white shadow-lg'
                    : 'bg-gray-200 hover:bg-tertiary hover:text-white'
                }`}
              >
                {hour}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center font-ibm text-gray-500">
          Seleccioná un día primero
        </p>
      )}
    </div>
  );
};

export default TimePickerComponent;

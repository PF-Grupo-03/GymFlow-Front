'use client';
import { CalendarComponentProps } from '@/interfaces/BookingInterface';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  onSelectDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Eliminar horas y minutos para evitar inconsistencias
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  useEffect(() => {
    setSelectedDate(null); // Reiniciar la selección al montar el componente
  }, []);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <div className="flex flex-col items-center bg-secondary p-4 rounded-2xl shadow-md">
      <h2 className="text-2xl text-primary font-holtwood mb-4">
        Seleccioná un día
      </h2>

      <div className="p-2 bg-white rounded-xl shadow-lg">
        <Calendar
          onChange={(date) => handleDateChange(date as Date)}
          value={selectedDate}
          minDate={today}
          maxDate={maxDate}
          locale="es-ES"
          className="custom-calendar font-ibm"
        />
      </div>
    </div>
  );
};

export default CalendarComponent;

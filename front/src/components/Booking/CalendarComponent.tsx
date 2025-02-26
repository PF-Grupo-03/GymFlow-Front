'use client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker-custom.css';

interface CalendarComponentProps {
  onSelectDate: (date: Date) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 6);
  maxDate.setHours(0, 0, 0, 0);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      onSelectDate(date);
    }
  };

  return (
    <div className="flex flex-col items-center bg-secondary p-4 rounded-2xl shadow-md">
      <h2 className="text-2xl text-primary font-holtwood mb-4">
        Seleccioná un día
      </h2>

      <div className="p-2 bg-white rounded-xl shadow-lg">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={today}
          maxDate={maxDate}
          inline
          locale={es}
          className="font-odor"
          dayClassName={(date: Date) => {
            const normalizedDate = new Date(date);
            normalizedDate.setHours(0, 0, 0, 0);

            if (normalizedDate > maxDate || normalizedDate < today) {
              return 'text-gray-400 cursor-not-allowed';
            }
            if (normalizedDate.toDateString() === selectedDate.toDateString()) {
              return 'bg-[#333333] text-white rounded-full';
            }
            if (normalizedDate.toDateString() === today.toDateString()) {
              return 'bg-orange-500 text-black rounded-full';
            }
            return 'bg-orange-500 text-black rounded-full';
          }}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
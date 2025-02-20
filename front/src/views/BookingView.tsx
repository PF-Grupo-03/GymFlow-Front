'use client';
import CalendarComponent from '@/components/Booking/CalendarComponent';
import TimePickerComponent from '@/components/Booking/TimePickerComponent';
import { useState } from 'react';

const BookingView = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      setIsBooked(true);
      setTimeout(() => setIsBooked(false), 3000); // Oculta el mensaje después de 3 segundos
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <div className="absolute inset-0 booking-bg before:absolute before:inset-0 before:bg-black/60"></div>

      <div className="relative z-10  p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <h1 className="text-3xl font-holtwood text-tertiary text-center mb-6">
          Reservá tu turno
        </h1>

        <CalendarComponent onSelectDate={setSelectedDate} />

        <TimePickerComponent
          selectedDate={selectedDate}
          onSelectTime={setSelectedTime}
        />

        {selectedDate && selectedTime && (
          <button
            onClick={handleBooking}
            className="mt-6 bg-tertiary text-primary font-holtwood py-3 px-6 rounded-lg shadow-md transition-all hover:bg-orange-600 w-full"
          >
            Reservar
          </button>
        )}

        {isBooked && (
          <div className="mt-6 p-4 border rounded-lg text-center bg-tertiary">
            <h3 className="text-xl font-ibm font-bold">
              ✅ Turno reservado con éxito
            </h3>
            <p>📅 Fecha: {selectedDate?.toLocaleDateString()}</p>
            <p>⏰ Hora: {selectedTime}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingView;

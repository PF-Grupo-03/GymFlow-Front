"use client";
import CalendarComponent from "@/components/Booking/CalendarComponent";
import TimePickerComponent from "@/components/Booking/TimePickerComponent";
import { Toast } from "@/components/Toast/Toast";
import { useState } from "react";

const BookingView = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      Toast.fire({
        icon: "success",
        title: "Turno reservado con éxito",
        text: `📅 ${selectedDate.toLocaleDateString()} ⏰ ${selectedTime}`,
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Por favor, selecciona una fecha y hora",
      });
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen -mt-5">
      <div className="absolute inset-0 booking-bg before:absolute before:inset-0 before:bg-black/60"></div>

      <div className="relative z-10 p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <h1 className="text-3xl font-holtwood text-tertiary text-center mb-6">
          Reservá tu turno
        </h1>

        <CalendarComponent onSelectDate={(date) => setSelectedDate(date)} />

        <TimePickerComponent
          selectedDate={selectedDate}
          onSelectTime={setSelectedTime}
        />

        <button
          onClick={handleBooking}
          className="mt-6 bg-tertiary text-primary font-holtwood py-3 px-6 rounded-lg shadow-md duration-300 w-full transition-transform transform hover:bg-orange-800 hover:scale-105"
        >
          Reservar
        </button>
      </div>
    </div>
  );
};

export default BookingView;

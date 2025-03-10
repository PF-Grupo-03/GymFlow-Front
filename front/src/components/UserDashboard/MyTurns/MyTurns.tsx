'use client';

import { useEffect, useState } from 'react';
import styles from './MyTurns.module.css';
import { useRouter } from 'next/navigation';

interface Turn {
  id: number;
  fecha: string;
  hora: string;
  estado: string;
}

const Turns = () => {
  const [turns, setTurns] = useState<Turn[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadedTurns: Turn[] = [
      { id: 1, fecha: '2023-10-01', hora: '10:00', estado: 'Confirmado' },
      { id: 2, fecha: '2023-10-02', hora: '11:00', estado: 'Confirmado' },
      { id: 3, fecha: '2023-10-03', hora: '12:00', estado: 'Cancelado' },
    ];

    setTurns(loadedTurns);
  }, []);

  return (
    <>
      <div className="flex justify-center items-center mt-5 font-odor mb-1">
        <h2 className="inline-block bg-white text-3xl rounded-[10px] text-primary px-4 py-2 mx-2 whiteShadow">
          Mis Turnos
        </h2>
      </div>
      <div className="flex justify-center items-center mt-1 mb-20 mx-6 sm:mx-12 md:mx-20 lg:mx-32 xl:mx-48">
        <div
          className={`flex flex-col justify-center items-center mt-5 gap-5 bg-secondary ${styles.whiteShadow} w-full sm:w-5/6 md:w-3/4 lg:w-1/2 xl:w-2/5 rounded-[10px] px-4 sm:px-8 md:px-12 py-8 sm:py-12 font-holtwood text-primary`}
        >
          {turns.map((turn) => (
            <div key={turn.id} className="w-full">
              <div className="border-2 rounded-[10px] border-tertiary w-full p-4 text-xs">
                <div className="flex justify-between items-center">
                  <span>Fecha: {turn.fecha}</span>
                  <span>Hora: {turn.hora}</span>
                </div>
                <div className="mt-2">
                  <span>Estado: {turn.estado}</span>
                </div>
              </div>
            </div>
          ))}
          <button
            className="w-full bg-tertiary text-primary rounded-lg p-2 mt-4 hover:bg-orange-400 transition-all duration-300 hover:scale-105"
            onClick={() => router.push('/Booking')}
          >
            Agendar Nuevo Turno
          </button>
        </div>
      </div>
    </>
  );
};

export default Turns;

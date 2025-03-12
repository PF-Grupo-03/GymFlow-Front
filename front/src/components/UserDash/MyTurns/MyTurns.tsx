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
      {/* Título */}
      <div className="flex justify-center items-center mt-5 font-odor mb-1">
        <h2 className="inline-block bg-white text-3xl rounded-[10px] text-primary px-4 py-2 mx-2 whiteShadow">
          Mis Turnos
        </h2>
      </div>

      {/* Contenedor principal */}
      <div className="flex justify-center items-center mt-1 mb-20 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        <div
          className={`flex flex-col justify-center items-center mt-5 gap-6 bg-secondary ${styles.whiteShadow} w-full max-w-3xl rounded-[10px] px-4 sm:px-8 md:px-12 py-8 sm:py-12 font-holtwood text-primary`}
        >
          {/* Listado de turnos */}
          {turns.map((turn) => (
            <div key={turn.id} className="w-full">
              <div className="border-2 rounded-[10px] border-tertiary w-full p-4 text-xs sm:text-sm flex flex-col gap-2 break-words">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                  <span>
                    <strong>Fecha:</strong> {turn.fecha}
                  </span>
                  <span>
                    <strong>Hora:</strong> {turn.hora}
                  </span>
                </div>
                <div>
                  <span>
                    <strong>Estado:</strong> {turn.estado}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Botón para agendar nuevo turno */}
          <button
            className="w-full bg-tertiary text-primary rounded-lg p-3 mt-4 hover:bg-orange-400 transition-all duration-300 hover:scale-105"
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

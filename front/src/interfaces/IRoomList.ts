// interfaces/IRoomList.ts
export interface Room {
  id: string;
  name: string;
  capacity: number;
  type: 'MUSCULACION' | 'FUNCIONAL';
  day:
    | 'LUNES'
    | 'MARTES'
    | 'MIERCOLES'
    | 'JUEVES'
    | 'VIERNES'
    | 'SABADO'
    | 'DOMINGO';
  time: string; // Ej: '08:00'
  userId?: string | null; // opcional, porque musculación puede no tener profesor
}

export interface RoomListProps {
  rooms: Room[]; // Asegúrate de que la propiedad rooms esté bien tipada
}

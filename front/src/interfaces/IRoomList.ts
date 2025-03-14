// interfaces/IRoomList.ts
export interface Room {
  id: string;
  name: string;
  capacity: number;
  day: string;
  type: string;
  startTime: string;
  endTime: string;
}

export interface RoomListProps {
  rooms: Room[]; // Asegúrate de que la propiedad rooms esté bien tipada
}

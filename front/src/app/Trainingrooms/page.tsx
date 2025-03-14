import RoomList from '@/components/TrainerDash/RoomList';
import { Room } from '@/interfaces/IRoomList';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getRooms(): Promise<Room[]> {
  const res = await fetch(`${API_URL}/rooms`, {
    cache: 'no-store', // siempre obtener datos frescos
  });

  if (!res.ok) throw new Error('Error al obtener las salas');

  return res.json();
}

export default async function RoomsPage() {
  const rooms = await getRooms();

  return <RoomList rooms={rooms} />;
}

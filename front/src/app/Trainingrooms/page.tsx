'use client';
import { useAuth } from '@/context/AuthContext'; // Asegúrate de que tienes acceso al token
import RoomList from '@/components/TrainerDash/RoomList';
import { Room } from '@/interfaces/IRoomList';
import { useEffect, useState } from 'react';
import { fetchRooms } from '@/helpers/room.helper';

export default function RoomsPage() {
  const { userData } = useAuth(); // Suponiendo que tienes el token en el contexto de autenticación
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userData?.token?.token) {
      fetchRooms(userData.token.token)
        .then((data) => {
          setRooms(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [userData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <RoomList rooms={rooms} />;
}

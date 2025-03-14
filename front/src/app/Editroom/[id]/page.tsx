// Component.tsx
import { useAuth } from '@/context/AuthContext';
import { getRoom } from '@/helpers/room.helper';

const SomeComponent = () => {
  const { token } = useAuth(); // Obtén el token desde el contexto

  const handleGetRoom = async (id: string) => {
    const validToken = token ?? ''; // Si token es null, asignamos una cadena vacía

    if (!validToken) {
      console.error('Token no disponible');
      return;
    }

    try {
      const roomData = await getRoom(id, validToken); // Pasa el token (ahora seguro que es un string)
      console.log('Room data:', roomData);
    } catch (error) {
      console.error('Error fetching room:', error);
    }
  };

  return (
    <div>
      <button onClick={() => handleGetRoom('someRoomId')}>Obtener sala</button>
    </div>
  );
};

export default SomeComponent;

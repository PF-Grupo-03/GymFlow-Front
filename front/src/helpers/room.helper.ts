// helpers/rooms.helper.ts
export async function getRoom(id: string, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Agregar el token en el encabezado de autorización
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener la sala');
  }

  return res.json(); // Devolver los datos de la sala
}

export const fetchRooms = async (token: string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_URL}/rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store', // siempre obtener datos frescos
    });

    if (!res.ok) throw new Error('Error al obtener las salas');

    return await res.json();
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw new Error('No se pudieron obtener las salas');
  }
};

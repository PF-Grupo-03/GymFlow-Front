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

// helpers/rooms.helper.ts

// Obtener todas las salas
export async function fetchRooms(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store', // Siempre traer datos actualizados
  });

  if (!res.ok) throw new Error('Error al obtener las salas');
  return res.json();
}

// Obtener una sala por ID
export async function getRoom(id: string, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Error al obtener la sala');
  return res.json();
}

// Obtener una sala por nombre
export async function getRoomByName(name: string, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/name/${name}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error('Error al obtener la sala por nombre');
  return res.json();
}

// Crear una sala
export async function createRoom(data: any, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Error al crear la sala');
  return res.json();
}

// Actualizar una sala
export async function updateRoom(id: string, data: any, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/update/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error('Error al actualizar la sala');
  return res.json();
}

// Eliminar (soft delete) una sala
export async function deleteRoom(id: string, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/delete/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error('Error al eliminar la sala');
  return res.json(); // Devuelve el mensaje de éxito del backend
}

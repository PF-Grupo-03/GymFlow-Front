'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { Toast } from '../Toast/Toast';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Room } from '@/interfaces/IRoomList';
import { fetchRooms, deleteRoom } from '@/helpers/room.helper';

const RoomList: React.FC = () => {
  const { userData } = useAuth();
  const router = useRouter();

  const [roomList, setRoomList] = useState<Room[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch inicial de salas
  useEffect(() => {
    if (userData?.token?.token) {
      fetchRooms(userData.token.token)
        .then((data) => setRoomList(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [userData]);

  // Eliminar sala
  const handleDeleteRoom = useCallback(
    async (id: string) => {
      if (window.confirm('¿Estás seguro de que deseas eliminar esta sala?')) {
        try {
          await deleteRoom(id, userData?.token.token as string);
          Toast.fire({ icon: 'success', title: 'Sala eliminada con éxito.' });
          setRoomList((prev) => prev.filter((room) => room.id !== id));
        } catch (error) {
          console.error(error);
          Toast.fire({ icon: 'error', title: 'Error al eliminar la sala.' });
        }
      }
    },
    [userData?.token.token]
  );

  const columns = useMemo<ColumnDef<Room>[]>(
    () => [
      { header: 'Nombre', accessorKey: 'name' },
      { header: 'Capacidad', accessorKey: 'capacity' },
      { header: 'Tipo', accessorKey: 'type' },
      { header: 'Día', accessorKey: 'day' },
      {
        header: 'Horario',
        accessorKey: 'startTime',
        cell: ({ getValue, row }) => {
          const start = new Date(getValue() as string);
          const end = new Date(row.original.endTime);
          return `${start.getHours()}:${start.getMinutes()} - ${end.getHours()}:${end.getMinutes()}`;
        },
      },
      {
        header: 'Acciones',
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => router.push(`/rooms/update/${row.original.id}`)}
              className="text-blue-500 hover:text-blue-700"
            >
              Editar
            </button>
            <button
              onClick={() => handleDeleteRoom(row.original.id)}
              className="text-red-500 hover:text-red-700"
            >
              Eliminar
            </button>
          </div>
        ),
      },
    ],
    [handleDeleteRoom, router]
  );

  const table = useReactTable({
    data: roomList,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Cargando salas...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg whiteShadow">
      <h2 className="text-2xl text-primary font-holtwood font-bold mb-4 text-center">
        Lista de Salas de Entrenamiento
      </h2>

      <input
        type="text"
        placeholder="Buscar sala..."
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="mb-4 px-4 text-primary py-2 border border-tertiary rounded-md w-full"
      />

      <table className="min-w-full divide-y divide-tertiary border">
        <thead className="bg-tertiary">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-xs font-medium text-primary font-odor uppercase tracking-wider"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-2 text-primary whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {roomList.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          No hay salas registradas.
        </p>
      )}
    </div>
  );
};

export default RoomList;

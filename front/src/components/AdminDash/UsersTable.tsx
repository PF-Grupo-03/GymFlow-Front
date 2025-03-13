'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { format } from 'date-fns'; // Importación de date-fns
import { useAuth } from '@/context/AuthContext'; // Importa el contexto de autenticación

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Membership {
  memberShipType: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface User {
  id: string;
  nameAndLastName: string;
  dni: string;
  bDate: string;
  address: string;
  member: Membership | null;
  assistedBookingsCount: number;
}

const AdminUsersTable = () => {
  const { userData, token } = useAuth(); // Obtén los datos del usuario del contexto
  const [users, setUsers] = useState<User[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      if (!userData) return; // Si no hay datos de usuario, no hacer la solicitud
      try {
        console.log('Este es el token que usamos:', token);
        const response = await fetch(`${API_URL}/users`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Error al obtener los usuarios');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };
    fetchUsers();
  }, [userData, token]); // Ejecutar la solicitud solo cuando los datos de usuario estén disponibles

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: 'Nombre',
        accessorKey: 'nameAndLastName',
      },
      {
        header: 'DNI',
        accessorKey: 'dni',
      },
      {
        header: 'Fecha de Nacimiento',
        accessorKey: 'bDate',
        cell: ({ getValue }) => {
          const date = new Date(getValue() as string);
          return format(date, 'dd/MM/yyyy');
        },
      },
      {
        header: 'Dirección',
        accessorKey: 'address',
      },
      {
        header: 'Membresía activa',
        accessorKey: 'member',
        cell: ({ getValue }) => {
          const member = getValue() as Membership | null;
          return member?.isActive ? 'Sí' : 'No';
        },
      },
      {
        header: 'Tipo Membresía',
        accessorKey: 'member.memberShipType',
        cell: ({ row }) => row.original.member?.memberShipType || 'N/A',
      },
      {
        header: 'Inicio Membresía',
        accessorKey: 'member.startDate',
        cell: ({ row }) =>
          row.original.member
            ? format(new Date(row.original.member.startDate), 'dd/MM/yyyy')
            : 'N/A',
      },
      {
        header: 'Fin Membresía',
        accessorKey: 'member.endDate',
        cell: ({ row }) =>
          row.original.member
            ? format(new Date(row.original.member.endDate), 'dd/MM/yyyy')
            : 'N/A',
      },
      {
        header: 'Turnos asistidos',
        accessorKey: 'assistedBookingsCount',
      },
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-6 bg-white rounded-lg whiteShadow">
      <h2 className="text-2xl text-primary font-holtwood font-bold mb-4 text-center">
        Usuarios Registrados
      </h2>

      {/* Filtro Global */}
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="mb-4 px-4 text-primary py-2 border border-tertiary rounded-md w-full"
      />

      {/* Tabla */}
      <table className="min-w-full divide-y divide-tertiary border">
        <thead className="bg-tertiary">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-xs font-medium text-primary font-odor uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
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

      {users.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          No hay usuarios registrados.
        </p>
      )}
    </div>
  );
};

export default AdminUsersTable;

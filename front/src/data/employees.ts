export interface Employee {
  id: number;
  name: string;
  specialties: string[];
  photo: string;
}

export const employees: Employee[] = [
  {
    id: 1,
    name: "Juan Perez",
    specialties: ["Musculacion", "Resistencia"],
    photo: "/employees/musculacion.jpg",
  },
  {
    id: 2,
    name: "Lucia Fernandez",
    specialties: ["Cardio", "Musculacion"],
    photo: "/employees/musculacion2.jpg",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    specialties: ["Funcional"],
    photo: "/employees/funcional.jpg",
  },
  {
    id: 4,
    name: "Carlos Gonzalez",
    specialties: ["Funcional", "Resistencia"],
    photo: "/employees/funcional2.jpg",
  },
];

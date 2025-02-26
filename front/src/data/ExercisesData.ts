export interface Exercise {
  id: string;
  name: string;
  category: string;
}

export interface ExerciseWithDetails extends Exercise {
  series: number;
  repetitions: number;
  gifUrl?: string;
}

export interface RoutineDay {
  day: string;
  categories: string[];
  exercises: ExerciseWithDetails[];
}

export const exercisesData: Exercise[] = [
  { id: "1", name: "Press de Banca", category: "Pecho" },
  { id: "2", name: "Elevaciones Laterales", category: "Hombro" },
  { id: "3", name: "Curl de Bíceps", category: "Bíceps" },
  { id: "4", name: "Sentadillas", category: "Pierna" },
  { id: "5", name: "Dominadas", category: "Espalda" },
  { id: "6", name: "Fondos en Paralelas", category: "Tríceps" },
  { id: "7", name: "Press Inclinado", category: "Pecho" },
  { id: "8", name: "Aperturas con Mancuernas", category: "Pecho" },
  { id: "9", name: "Press de Banca con Mancuernas", category: "Pecho" },
  { id: "10", name: "Fondos en Paralelas para Pecho", category: "Pecho" },
  { id: "11", name: "Press Declinado", category: "Pecho" },
  { id: "12", name: "Press Militar", category: "Hombro" },
  { id: "13", name: "Elevaciones Frontales", category: "Hombro" },
  { id: "14", name: "Remo al Mentón", category: "Hombro" },
  { id: "15", name: "Press Arnold", category: "Hombro" },
  { id: "16", name: "Pájaros Inclinados", category: "Hombro" },
  { id: "17", name: "Curl Concentrado", category: "Bíceps" },
  { id: "18", name: "Curl Martillo", category: "Bíceps" },
  { id: "19", name: "Curl con Barra", category: "Bíceps" },
  { id: "20", name: "Curl en Banco Scott", category: "Bíceps" },
  { id: "21", name: "Curl Invertido", category: "Bíceps" },
  { id: "22", name: "Prensa de Piernas", category: "Pierna" },
  { id: "23", name: "Extensiones de Pierna", category: "Pierna" },
  { id: "24", name: "Peso Muerto Rumano", category: "Pierna" },
  { id: "25", name: "Zancadas", category: "Pierna" },
  { id: "26", name: "Elevaciones de Talones", category: "Pierna" },
  { id: "27", name: "Remo con Barra", category: "Espalda" },
  { id: "28", name: "Remo con Mancuernas", category: "Espalda" },
  { id: "29", name: "Peso Muerto", category: "Espalda" },
  { id: "30", name: "Pullover", category: "Espalda" },
  { id: "31", name: "Jalón al Pecho", category: "Espalda" },
  { id: "32", name: "Extensiones de Tríceps con Barra", category: "Tríceps" },
  { id: "33",name: "Extensiones de Tríceps con Mancuernas",category: "Tríceps"},
  { id: "34", name: "Press Francés", category: "Tríceps" },
  { id: "35", name: "Jalones de Tríceps con Cuerda", category: "Tríceps" },
  { id: "36", name: "Patada de Tríceps", category: "Tríceps" },
];

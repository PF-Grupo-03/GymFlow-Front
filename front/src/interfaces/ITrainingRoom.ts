export interface TrainingRoomFormValues {
  name: string;
  capacity: string;
  scheduleFrom: string;
  day: string; // Array de días seleccionados
  type: 'Musculación' | 'Funcional' | '';
  trainer?: string;
}

export interface TrainingRoomFormProps {
  roomToEdit?: Partial<TrainingRoomFormValues> & { id?: string };
}

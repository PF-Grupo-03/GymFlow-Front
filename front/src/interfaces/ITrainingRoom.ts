export interface TrainingRoomFormValues {
  name: string;
  capacity: number | string;
  scheduleFrom: string;
  scheduleTo: string;
  days: string[]; // Array de días seleccionados
  type: 'Musculación' | 'Funcional' | '';
  trainer?: string;
}

export interface TrainingRoomFormProps {
  roomToEdit?: Partial<TrainingRoomFormValues> & { id?: string };
}

// interfaces/ITrainingRoom.ts

export interface TrainingRoomFormValues {
  name: string;
  capacity: string;
  day: string;
  scheduleFrom: string;
  type: 'Musculación' | 'Funcional' | '';
  trainer: string;
}

export interface TrainingRoomFormProps {
  roomToEdit?: TrainingRoomToEdit;
}

export interface TrainingRoomToEdit {
  id: string;
  name: string;
  capacity: number;
  day: string;
  scheduleFrom: string;
  type: 'MUSCULACION' | 'FUNCIONAL';
  trainer?: string | null;
}

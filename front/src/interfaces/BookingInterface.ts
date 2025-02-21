export interface TimePickerComponentProps {
  selectedDate: Date | null;
  onSelectTime: (time: string) => void;
}

export interface CalendarComponentProps {
  onSelectDate: (date: Date) => void;
}

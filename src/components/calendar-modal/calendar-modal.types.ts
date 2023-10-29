export interface CalendarModalProps {
  selectedDate?: string;
  visible: boolean;
  onChangeDate: (dateString: string) => void;
  hideCalendar: () => void;
}

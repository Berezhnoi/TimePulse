export interface CalendarModalProps {
  selectedDate?: string;
  visible: boolean;
  onChangeDate: (dateString: string) => void;
  hideCalendar: () => void;

  /**
   * Maximum date that can be selected, dates after maxDate will be grayed out
   */
  maxDate?: string;

  showOkButton?: boolean;
}

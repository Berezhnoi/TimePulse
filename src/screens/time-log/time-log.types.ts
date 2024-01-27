import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TimesheetStackParamsList} from 'types/navigation';
import {SCREENS} from 'config/screens';

export type TimeLogScreenProps = NativeStackScreenProps<TimesheetStackParamsList, SCREENS.TimeLog>;

export interface TimeLogForm {
  selectedDate: string;
  notes: string;
  workTimeFrom: Date | null;
  workTimeTo: Date | null;
}

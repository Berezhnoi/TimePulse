import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TimesheetStackParamsList} from 'types/navigation';
import {SCREENS} from 'config/screens';

export type TimesheetScreenProps = NativeStackScreenProps<
  TimesheetStackParamsList,
  SCREENS.TimesheetMain
>;

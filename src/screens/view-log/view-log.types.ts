import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TimesheetStackParamsList} from 'types/navigation';
import {SCREENS} from 'config/screens';

export type ViewLogScreenProps = NativeStackScreenProps<TimesheetStackParamsList, SCREENS.ViewLog>;

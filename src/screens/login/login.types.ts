import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamsList} from 'types/navigation';
import {SCREENS} from 'config/screens';

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamsList,
  SCREENS.Login
>;

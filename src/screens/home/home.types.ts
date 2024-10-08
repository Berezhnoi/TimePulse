import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TabStackParamsList} from 'types/navigation';
import {SCREENS} from 'config/screens';

export type HomeScreenProps = NativeStackScreenProps<
  TabStackParamsList,
  SCREENS.Home
>;

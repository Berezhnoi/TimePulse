import {StyleSheet} from 'react-native';

import flexStyles from './flex';
import marginStyles from './margin';
import paddingStyles from './padding';

const styles = StyleSheet.create({
  ...flexStyles,
  ...marginStyles,
  ...paddingStyles,
});

export default styles;

import {StyleSheet} from 'react-native';

import flexStyles from './flex';
import marginStyles from './margin';
import paddingStyles from './padding';

const styles = StyleSheet.create({
  ...flexStyles,
  ...marginStyles,
  ...paddingStyles,

  required: {
    color: '#B90808',
  },
});

export default styles;

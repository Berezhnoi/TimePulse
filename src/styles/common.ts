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
  text: {
    fontSize: 14,
    color: '#000000d9',
  },
});

export default styles;

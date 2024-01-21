import {StyleSheet} from 'react-native';
import colors from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  darkorangeText: {
    fontWeight: '500',
    color: colors.darkorange,
  },
  reportButton: {
    borderRadius: 12,
    backgroundColor: colors.orangered,
  },
  disabledButton: {
    backgroundColor: colors.lightgray,
    opacity: 0.8,
  },
});

export default styles;

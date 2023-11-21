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
  printReportButton: {
    borderRadius: 12,
    marginTop: 30,
    width: 180,
    backgroundColor: colors.orangered,
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: colors.lightgray,
    opacity: 0.8,
  },
});

export default styles;

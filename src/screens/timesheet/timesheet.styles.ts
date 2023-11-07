import {StyleSheet} from 'react-native';
import colors from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: colors.darkorange,
  },
  addTimeLogButton: {
    width: 150,
    backgroundColor: colors.orangered,
  },
  sectionHeader: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 22,
    fontWeight: '500',
    backgroundColor: colors.ghostwhite,
  },
});

export default styles;

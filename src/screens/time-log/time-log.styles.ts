import {StyleSheet} from 'react-native';
import colors from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 18,
    color: colors.black,
    marginTop: 16,
  },
  section: {
    marginBottom: 25,
  },
  label: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  addTimeLogButton: {
    width: 85,
    backgroundColor: colors.orangered,
  },
  cancelButton: {
    width: 100,
    marginLeft: 15,
  },
});

export default styles;

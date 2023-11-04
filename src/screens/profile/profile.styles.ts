import {StyleSheet} from 'react-native';
import colors from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingBottom: 20,
    flexGrow: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  actionButton: {
    width: 120,
    borderRadius: 8,
    backgroundColor: colors.orangered,
    marginLeft: 'auto',
  },
  logOutButton: {
    marginTop: 'auto',
    marginLeft: 'auto',
  },
});

export default styles;

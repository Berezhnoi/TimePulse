import {StyleSheet} from 'react-native';
import colors from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
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
    marginBottom: 20,
    marginLeft: 'auto',
  },
});

export default styles;

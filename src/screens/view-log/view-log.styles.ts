import {StyleSheet} from 'react-native';
import colors from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  backButton: {
    position: 'absolute',
    left: 0,
    top: 12,
  },
  pauseInput: {
    width: 120,
    textAlign: 'center',
  },
});

export default styles;

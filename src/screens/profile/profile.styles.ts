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
    minWidth: 120,
    borderRadius: 8,
    backgroundColor: colors.orangered,
    marginLeft: 'auto',
  },
  logOutButton: {
    marginTop: 'auto',
    marginBottom: 20,
    marginLeft: 'auto',
  },
  lngListItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  lngListItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default styles;

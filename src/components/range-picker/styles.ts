import {StyleSheet} from 'react-native';
import colors from 'theme/colors';

const styles = StyleSheet.create({
  container: {
    height: 32,
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CFD4DC',
    backgroundColor: colors.white,
  },
  inputStyles: {
    borderWidth: 0,
    borderRadius: 0,
    height: 32,
    backgroundColor: 'transparent',
  },
  startDate: {
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  endDate: {
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  activeDateFilter: {
    position: 'absolute',
    left: 10,
    right: 15,
    bottom: 1,
    height: 1,
    backgroundColor: colors.primaryBlue,
  },
  timeRangeArrow: {
    position: 'absolute',
    bottom: 10,
    right: '50%',
  },
  tabletFiltersItem: {
    marginBottom: 20,
    marginRight: 10,
  },
});

export default styles;

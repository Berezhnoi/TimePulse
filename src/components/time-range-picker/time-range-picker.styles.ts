import {StyleSheet} from 'react-native';

const PaddingVertical = 10;

const styles = StyleSheet.create({
  androidContainer: {
    flexDirection: 'row',
  },
  picker: {
    flexGrow: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: PaddingVertical,
  },
  delimiter: {
    marginHorizontal: 20,
    paddingVertical: PaddingVertical,
  },
});

export default styles;

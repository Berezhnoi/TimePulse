// Libs
import React from 'react';

// Components
import {View} from 'react-native';

// Hooks
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Types
import {HomeScreenProps} from './home.types';

// Styles
import {commonStyles} from 'styles';
import styles from './home.styles';
import RangePicker from 'components/range-picker';

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <RangePicker />
    </View>
  );
};

export default HomeScreen;

// Libs
import React from 'react';

// Components
import {View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

// Hooks
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Types
import {HomeScreenProps} from './home.types';

// Styles
import {commonStyles} from 'styles';
import styles from './home.styles';

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const insets = useSafeAreaInsets();

  const barData = [
    {value: 8, label: 'M'},
    {value: 8, label: 'T'},
    {value: 8, label: 'W', frontColor: 'lightgray'},
    {value: 8, label: 'T'},
    {value: 8, label: 'F'},
    {value: 8, label: 'S'},
    {value: 14, label: 'S'},
  ];

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <BarChart
        barWidth={22}
        barBorderRadius={4}
        frontColor="#177AD5"
        data={barData}
        // yAxisThickness={0}
        // xAxisThickness={0}
      />
    </View>
  );
};

export default HomeScreen;

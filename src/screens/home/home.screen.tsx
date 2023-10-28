// Libs
import React from 'react';

// Components
import {View, Text} from 'react-native';

// Types
import {HomeScreenProps} from './home.types';

// Styles
import styles from './home.styles';

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

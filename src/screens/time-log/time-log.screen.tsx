// Libs
import React from 'react';

// Components
import {View, Text} from 'react-native';

// Types
import {TimeLogScreenProps} from './time-log.types';

// Styles
import styles from './time-log.styles';

const TimeLogScreen: React.FC<TimeLogScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>TimeLogScreen</Text>
    </View>
  );
};

export default TimeLogScreen;

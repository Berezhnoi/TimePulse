// Libs
import React from 'react';

// Components
import {View} from 'react-native';
import {Button} from 'react-native-paper';

// Hooks
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Config
import {SCREENS} from 'config/screens';

// Types
import {TimesheetScreenProps} from './timesheet.types';

// Styles
import styles from './timesheet.styles';

const TimesheetScreen: React.FC<TimesheetScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Button
        icon=""
        mode="contained"
        onPress={() => navigation.navigate(SCREENS.TimeLog)}
        style={styles.addTimeLogButton}>
        Add Time Log
      </Button>
    </View>
  );
};

export default TimesheetScreen;

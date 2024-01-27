// Libs
import React from 'react';
import {AndroidNativeProps, DateTimePickerAndroid, DateTimePickerEvent} from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

// Components
import {View, Text, Platform, TouchableOpacity} from 'react-native';

// Types
import {TimeRangePickerProps} from './time-range-picker.types';

// Styles
import {commonStyles} from 'styles';
import styles from './time-range-picker.styles';

const TimeRangePickerAndroid: React.FC<Pick<TimeRangePickerProps, 'time' | 'onChange' | 'editable'>> = ({
  time,
  editable = true,
  onChange,
}) => {
  const disabled: boolean = editable === false;

  const showTimepicker = (variant: 'fromTime' | 'toTime'): void => {
    const options: AndroidNativeProps = {
      value: (variant === 'fromTime' ? time.from : time.to) || new Date(),
      onChange: (__: DateTimePickerEvent, selectedDate?: Date | undefined) => {
        if (!selectedDate) return;

        if (variant === 'fromTime') {
          onChange?.({...time, from: selectedDate});
        } else if (variant === 'toTime') {
          onChange?.({...time, to: selectedDate});
        }
      },
      mode: 'time',
      is24Hour: true,
    };

    DateTimePickerAndroid.open(options);
  };

  const displayTime = (date: Date | null): string => {
    if (!date) return '-';
    return dayjs(date).format('HH:mm');
  };

  return (
    <View style={styles.androidContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.picker}
        disabled={disabled}
        onPress={() => !disabled && showTimepicker('fromTime')}>
        <Text style={commonStyles.text}>{displayTime(time.from)}</Text>
      </TouchableOpacity>

      <View style={styles.delimiter}>
        <Text style={commonStyles.text}>bis</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.picker}
        disabled={disabled}
        onPress={() => !disabled && showTimepicker('toTime')}>
        <Text style={commonStyles.text}>{displayTime(time.to)}</Text>
      </TouchableOpacity>
    </View>
  );
};

const TimeRangePicker: React.FC<TimeRangePickerProps> = props => {
  if (Platform.OS === 'android') {
    return <TimeRangePickerAndroid {...props} />;
  }

  if (Platform.OS === 'ios') {
    return null;
  }

  return null;
};

export default TimeRangePicker;

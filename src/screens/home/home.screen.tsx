// Libs
import React, {useState} from 'react';
import dayjs from 'dayjs';

// Components
import {Text, View} from 'react-native';
import RangePicker from 'components/range-picker';

// Hooks
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppSelector} from 'store';

// Store
import {getUserTimeLogs} from 'store/slices/timeLogsSlice';

// Types
import {HomeScreenProps} from './home.types';

// Styles
import {commonStyles} from 'styles';
import styles from './home.styles';

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const insets = useSafeAreaInsets();

  const timeLogs = useAppSelector(getUserTimeLogs);

  const [timeRange, setTimeRange] = useState<{startDate: Date; endDate: Date}>({
    startDate: dayjs().startOf('month').toDate(),
    endDate: new Date(),
  });

  const filteredLogs = timeLogs.filter(log => {
    const loggedDate = dayjs(log.loggedDate);
    const startRangeCondition = loggedDate.isAfter(timeRange.startDate) || loggedDate.isSame(timeRange.startDate);
    const endRangeCondition = loggedDate.isBefore(timeRange.endDate) || loggedDate.isSame(timeRange.endDate);
    return startRangeCondition && endRangeCondition;
  });

  const loggedHours: number = filteredLogs.reduce((acc, log) => (acc += log.loggedTime), 0);

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <RangePicker
        label={'Time range'}
        required
        mode="date"
        startDatePlaceholder={'Start date'}
        endDatePlaceholder={'End date'}
        values={timeRange ? {startDate: timeRange.startDate, endDate: timeRange.endDate} : undefined}
        onChange={values => setTimeRange({startDate: values.startDate, endDate: values.endDate})}
      />

      <Text>{loggedHours}</Text>
    </View>
  );
};

export default HomeScreen;

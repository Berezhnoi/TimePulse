// Libs
import React, {useState} from 'react';
import dayjs from 'dayjs';

// Components
import {View} from 'react-native';
import {Avatar, Text, Button} from 'react-native-paper';
import RangePicker from 'components/range-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Hooks
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from 'store';

// Store
import {getUserTimeLogs} from 'store/slices/timeLogsSlice';

// Utils
import {ReportHelper} from 'utils/report';

// Theme
import colors from 'theme/colors';

// Types
import {TimeLog} from 'types/models/time-log';
import {HomeScreenProps} from './home.types';

// Styles
import {commonStyles} from 'styles';
import styles from './home.styles';

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const insets = useSafeAreaInsets();

  const timeLogs = useAppSelector(getUserTimeLogs);

  const userData = useAppSelector(state => state.user);

  const {t} = useTranslation('translation', {keyPrefix: 'home'});

  const [timeRange, setTimeRange] = useState<{startDate: Date; endDate: Date}>({
    startDate: dayjs().startOf('month').toDate(),
    endDate: new Date(),
  });

  const filteredLogs: TimeLog[] = timeLogs.filter(log => {
    const loggedDate = dayjs(log.loggedDate);
    const startRangeCondition = loggedDate.isAfter(timeRange.startDate) || loggedDate.isSame(timeRange.startDate);
    const endRangeCondition = loggedDate.isBefore(timeRange.endDate) || loggedDate.isSame(timeRange.endDate);
    return startRangeCondition && endRangeCondition;
  });

  const loggedHours: number = filteredLogs.reduce((acc, log) => (acc += log.loggedTime), 0);

  const printReport = async (): Promise<void> => {
    try {
      await ReportHelper.printReport({
        title: 'Time Log',
        fromDate: timeRange.startDate,
        toDate: timeRange.endDate,
        generatedDate: new Date(),
        generatedFor: userData.name || userData.surname || userData.username || 'Friend',
        logs: filteredLogs,
      });
    } catch (error) {
      console.error(`[printReport] ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[commonStyles.row, commonStyles.alignItemsCenter, commonStyles.mB25, {paddingTop: insets.top}]}>
        <Avatar.Image size={51} source={require('../../assets/avatar.png')} />
        <View style={[commonStyles.mL20]}>
          <Text>{t('welcomeBack')},</Text>
          <Text variant="titleMedium" style={styles.darkorangeText}>
            {userData.name || 'FRIEND'}
          </Text>
        </View>
      </View>

      <RangePicker
        label={t('timeRange')}
        required
        mode="date"
        startDatePlaceholder={'Start date'}
        endDatePlaceholder={'End date'}
        values={timeRange ? {startDate: timeRange.startDate, endDate: timeRange.endDate} : undefined}
        onChange={values => setTimeRange({startDate: values.startDate, endDate: values.endDate})}
      />

      <View style={[commonStyles.row, commonStyles.alignItemsCenter, commonStyles.mT35]}>
        <MaterialCommunityIcons name="progress-clock" size={128} color={colors.orange} style={{opacity: 0.8}} />
        <View style={[commonStyles.fS1]}>
          <Text variant="headlineSmall">{t('totalLogHours')}</Text>
          <View style={[commonStyles.row, commonStyles.alignItemsBaseline]}>
            <Text variant="displayMedium" style={styles.darkorangeText}>
              {loggedHours}
            </Text>
            <Text variant="labelLarge"> {t('hrs')}</Text>
          </View>
        </View>
      </View>

      <Button
        icon={() => <MaterialCommunityIcons name="printer" size={34} color={colors.white} />}
        mode="contained"
        style={[styles.printReportButton, loggedHours <= 0 && styles.disabledButton]}
        disabled={loggedHours <= 0}
        onPress={printReport}>
        <Text variant="headlineSmall" style={{color: colors.white}}>
          {t('print')}
        </Text>
      </Button>
    </View>
  );
};

export default HomeScreen;

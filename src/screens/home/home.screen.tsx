// Libs
import React, {useState} from 'react';
import dayjs from 'dayjs';

// Components
import {View} from 'react-native';
import {Avatar, Text, Button} from 'react-native-paper';
import RangePicker from 'components/range-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Hooks
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from 'store';

// Store
import {getUserTimeLogs} from 'store/slices/timeLogsSlice';

// Utils
import {calculateTotalTime} from 'utils';
import {ReportHelper} from 'utils/report';
import {ImagePickerHelper} from 'utils/ImagePickerHelper';

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

  const loggedTotalTime = calculateTotalTime(filteredLogs);

  const getReportTemplateParams = () => {
    return {
      title: 'Time Log',
      fromDate: timeRange.startDate,
      toDate: timeRange.endDate,
      generatedDate: new Date(),
      generatedFor: userData.name || userData.surname || userData.username || 'Friend',
      logs: filteredLogs,
    };
  };

  const printReport = async (): Promise<void> => {
    try {
      await ReportHelper.printReport(getReportTemplateParams());
    } catch (error) {
      console.error(`[printReport] ${error}`);
    }
  };

  const shareReport = async (type: 'selectPicture' | 'takePicture'): Promise<void> => {
    try {
      const result = await (type === 'selectPicture'
        ? ImagePickerHelper.selectPhoto({selectionLimit: 1})
        : ImagePickerHelper.takePhoto());
      const selectedImage = result?.assets?.[0];
      if (result?.didCancel || result?.errorCode || result?.errorMessage || !selectedImage) {
        // Abort the method
        return;
      }
      await ReportHelper.shareReport(selectedImage, loggedTotalTime.hours > 0 ? getReportTemplateParams() : undefined);
    } catch (error) {
      console.error('[shareImageReport] ', error);
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
              {loggedTotalTime.hours}
            </Text>
            <Text variant="labelLarge"> {t('hrs')}</Text>
          </View>
        </View>
      </View>

      <Button
        icon={() => <Ionicons name="camera" size={34} color={colors.white} />}
        mode="contained"
        style={[styles.reportButton, commonStyles.mT30]}
        onPress={() => shareReport('takePicture')}>
        <Text variant="titleLarge" style={{color: colors.white}}>
          {t('takePhotoAndShare')}
        </Text>
      </Button>

      <Button
        icon={() => <Ionicons name="images" size={34} color={colors.white} />}
        mode="contained"
        style={[styles.reportButton, commonStyles.mT30]}
        onPress={() => shareReport('selectPicture')}>
        <Text variant="titleLarge" style={{color: colors.white}}>
          {t('selectPhotoAndShare')}
        </Text>
      </Button>

      <Button
        icon={() => <MaterialCommunityIcons name="printer" size={34} color={colors.white} />}
        mode="contained"
        style={[styles.reportButton, commonStyles.mT30, loggedTotalTime.hours <= 0 && styles.disabledButton]}
        disabled={loggedTotalTime.hours <= 0}
        onPress={printReport}>
        <Text variant="titleLarge" style={{color: colors.white}}>
          {t('print')}
        </Text>
      </Button>
    </View>
  );
};

export default HomeScreen;

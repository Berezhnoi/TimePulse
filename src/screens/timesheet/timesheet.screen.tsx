// Libs
import React from 'react';
import {format} from 'date-fns';
import {de} from 'date-fns/locale';

// Components
import {SectionList, Text, View} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import TimesheetListItem from 'components/timesheet-list-item';

// Hooks
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from 'store';

// Store
import {getUserTimeLogs} from 'store/slices/timeLogsSlice';

// Config
import {SCREENS} from 'config/screens';

// Types
import {TimeLog} from 'types/models/time-log';
import {TimesheetScreenProps} from './timesheet.types';

// Styles
import {commonStyles} from 'styles';
import styles from './timesheet.styles';

const TimesheetScreen: React.FC<TimesheetScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const {t} = useTranslation('translation', {keyPrefix: 'timesheet'});

  const timeLogs: TimeLog[] = useAppSelector(getUserTimeLogs);

  const listData: Array<{title: string; data: TimeLog[]}> = timeLogs
    .reduce((result, timeLog) => {
      const date = format(new Date(timeLog.loggedDate), 'dd.MM.yyyy', {locale: de});
      const existingEntry = result.find(entry => entry.title === date);

      if (existingEntry) {
        existingEntry.data.push(timeLog);
      } else {
        result.push({title: date, data: [timeLog]});
      }

      return result;
    }, [] as Array<{title: string; data: TimeLog[]}>)
    .sort((a, b) => b.data[0].loggedDate - a.data[0].loggedDate);

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View
        style={[
          commonStyles.row,
          commonStyles.justifyContentSpaceBetween,
          commonStyles.alignItemsCenter,
          commonStyles.pH15,
          commonStyles.mT10,
          commonStyles.mB10,
        ]}>
        <Text style={styles.title}>{t('title')}</Text>
        <Button
          icon=""
          mode="contained"
          onPress={() => navigation.navigate(SCREENS.TimeLog)}
          style={styles.addTimeLogButton}>
          {t('addTimeLog')}
        </Button>
      </View>

      <SectionList
        sections={listData}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({item}: {item: TimeLog}) => <TimesheetListItem item={item} />}
        ItemSeparatorComponent={() => <Divider />}
        renderSectionHeader={({section: {title}}) => <Text style={styles.sectionHeader}>{title}</Text>}
        contentContainerStyle={commonStyles.fG1}
      />
    </View>
  );
};

export default TimesheetScreen;

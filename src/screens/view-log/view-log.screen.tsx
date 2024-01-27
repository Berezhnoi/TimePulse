// Libs
import React from 'react';
import {format} from 'date-fns';
import {de} from 'date-fns/locale';

// Components
import {View, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TimeRangePicker from 'components/time-range-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Hooks
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from 'store';

// Actions
import {geLogById} from 'store/slices/timeLogsSlice';

// Utils
import {capitalize, millisecondsToMinutes} from 'utils';

// Types
import {ViewLogScreenProps} from './view-log.types';

// Styles
import {commonStyles} from 'styles';
import styles from './view-log.styles';

const ViewLogScreen: React.FC<ViewLogScreenProps> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();

  const {t} = useTranslation('translation');

  const logData = useAppSelector(state => geLogById(state, route.params.logId));

  const formatedDate: string = format(logData ? new Date(logData.loggedDate) : new Date(), 'dd.MM.yyyy', {locale: de});

  const workTime = {
    from: logData ? new Date(logData.fromTime) : new Date(),
    to: logData ? new Date(logData.toTime) : new Date(),
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={30}
      enableOnAndroid={true}
      style={commonStyles.full}
      contentContainerStyle={[styles.container, {paddingTop: insets.top}]}>
      <View style={[commonStyles.row, commonStyles.justifyContentCenter, styles.section]}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backButton}
          hitSlop={{
            top: 20,
            left: 20,
            bottom: 20,
            right: 20,
          }}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={26} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('timeLog.viewTimeLog')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>
          {capitalize(t('timeLog.date'))} <Text style={commonStyles.required}>*</Text>
        </Text>
        <TextInput value={formatedDate} editable={false} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>
          {capitalize(t('timeLog.workingTime'))} <Text style={commonStyles.required}>*</Text>
        </Text>
        <TimeRangePicker time={workTime} toText={t('timeLog.to')} editable={false} />
      </View>

      {logData && logData.pause > 0 && (
        <View style={styles.section}>
          <Text style={styles.label}>{capitalize(t('timeLog.pause'))}</Text>
          <TextInput
            value={`${millisecondsToMinutes(logData.pause)} ${t('timeLog.shortMin')}`}
            editable={false}
            style={styles.pauseInput}
          />
        </View>
      )}

      {logData?.notes && logData.notes.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.label}>{capitalize(t('timeLog.notes'))}</Text>
          <TextInput
            value={logData.notes}
            editable={false}
            multiline
            mode="outlined"
            style={{height: 120}}
            numberOfLines={4}
          />
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default ViewLogScreen;

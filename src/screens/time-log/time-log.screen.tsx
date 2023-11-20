// Libs
import React, {useMemo, useState} from 'react';
import {Platform} from 'react-native';
import {format} from 'date-fns';
import {de} from 'date-fns/locale';

// Components
import {View, Text, TouchableOpacity} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CalendarModal from 'components/calendar-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Hooks
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from 'store';

// Actions
import {addTimeLog} from 'store/slices/timeLogsSlice';

// Utils
import {isNumeric} from 'utils';
import {TimeLogDTO} from 'utils/TimeLogDTO';

// Config
import {SCREENS} from 'config/screens';

// Types
import {TimeLogForm, TimeLogScreenProps} from './time-log.types';

// Styles
import {commonStyles} from 'styles';
import styles from './time-log.styles';

const DATE_FORMAT = 'yyyy-MM-dd';

const TimeLogScreen: React.FC<TimeLogScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user);

  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), DATE_FORMAT));
  const [dailyLog, setDailyLog] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [touched, setTouched] = useState<Record<keyof TimeLogForm, boolean>>({
    selectedDate: false,
    dailyLog: false,
    notes: false,
  });

  const [visibleCalendar, setCalendarVisible] = useState<boolean>(false);

  const showCalendar = () => setCalendarVisible(true);
  const hideCalendar = () => setCalendarVisible(false);

  const formatedDate: string = format(new Date(selectedDate), 'dd.MM.yyyy', {locale: de});

  const errors: Partial<Record<keyof TimeLogForm, string>> = useMemo(() => {
    const result: Partial<Record<keyof TimeLogForm, string>> = {};

    if (!isNumeric(dailyLog) || Number(dailyLog) <= 0) {
      result.dailyLog = 'Daily log is mandatory field';
    }

    if (!result.dailyLog && Number(dailyLog) > 24) {
      result.dailyLog = 'Daily log - maximum value is 24';
    }

    return result;
  }, [dailyLog]);

  const hasFieldError = (fieldKey: keyof TimeLogForm): boolean => {
    return !!errors[fieldKey];
  };

  const onSubmit = (): void => {
    if (Object.keys(errors).some(err => !!err)) {
      setTouched({
        selectedDate: true,
        dailyLog: true,
        notes: true,
      });
      return;
    }

    if (!user.id) return;

    const timeLog = new TimeLogDTO(Number(dailyLog), Number(new Date(selectedDate)), notes);

    dispatch(addTimeLog({userId: user.id, timeLog: timeLog}));

    navigation.navigate(SCREENS.TimesheetMain);
  };

  const onCancel = (): void => {
    navigation.navigate(SCREENS.TimesheetMain);
  };

  const onChangeDailyLog = (value: string) => {
    if (!touched.dailyLog) {
      setTouched(prevState => ({...prevState, dailyLog: true}));
    }
    // Use a regular expression to remove any characters that are not numbers or spaces
    const sanitizedValue = value.replace(/[^0-9\s]/g, '');
    setDailyLog(sanitizedValue);
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
          onPress={onCancel}>
          <MaterialCommunityIcons name="arrow-left" size={26} />
        </TouchableOpacity>
        <Text style={styles.title}>New Time Log</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>
          Date <Text style={commonStyles.required}>*</Text>
        </Text>
        <TouchableOpacity activeOpacity={1} onPress={Platform.OS === 'android' ? showCalendar : undefined}>
          <TextInput
            value={formatedDate}
            editable={false}
            onPressIn={Platform.OS === 'ios' ? showCalendar : undefined}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>
          Daily Log <Text style={commonStyles.required}>*</Text>
        </Text>
        <TextInput keyboardType="number-pad" maxLength={2} value={dailyLog} onChangeText={onChangeDailyLog} />
        <HelperText type="error" visible={touched.dailyLog && hasFieldError('dailyLog')} padding="none">
          {errors.dailyLog}
        </HelperText>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          value={notes}
          onChangeText={text => setNotes(text)}
          multiline
          mode="outlined"
          style={{height: 120}}
          numberOfLines={4}
        />
      </View>

      <View style={[commonStyles.row]}>
        <Button mode="contained" style={styles.addTimeLogButton} onPress={onSubmit}>
          Add
        </Button>
        <Button mode="contained" style={styles.cancelButton} onPress={onCancel}>
          Cancel
        </Button>
      </View>

      <CalendarModal
        selectedDate={selectedDate}
        visible={visibleCalendar}
        showOkButton
        onChangeDate={date => setSelectedDate(date)}
        hideCalendar={hideCalendar}
        maxDate={format(new Date(), DATE_FORMAT)}
      />
    </KeyboardAwareScrollView>
  );
};

export default TimeLogScreen;

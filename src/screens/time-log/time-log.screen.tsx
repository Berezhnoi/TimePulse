// Libs
import React, {useMemo, useState} from 'react';
import {Platform} from 'react-native';
import {format, isBefore, isAfter, isEqual} from 'date-fns';
import {de} from 'date-fns/locale';

// Components
import {View, Text, TouchableOpacity} from 'react-native';
import {Button, HelperText, Switch, TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarModal from 'components/calendar-modal';
import TimeRangePicker from 'components/time-range-picker';

// Hooks
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from 'store';

// Actions
import {addTimeLog} from 'store/slices/timeLogsSlice';

// Utils
import {TimeLogDTO} from 'utils/TimeLogDTO';
import {minutesToMilliseconds} from 'utils';

// Config
import {SCREENS, DATE_FORMAT, PAUSE_IN_MIN} from 'config';

// Types
import {TimeLogForm, TimeLogScreenProps} from './time-log.types';

// Styles
import {commonStyles} from 'styles';
import styles from './time-log.styles';

const TimeLogScreen: React.FC<TimeLogScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user);

  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), DATE_FORMAT));
  const [notes, setNotes] = useState<string>('');

  const [touched, setTouched] = useState<Record<keyof TimeLogForm, boolean>>({
    selectedDate: false,
    notes: false,
    workTimeFrom: false,
    workTimeTo: false,
  });

  const [workTime, setWorkTime] = useState<{
    from: Date | null;
    to: Date | null;
  }>({from: null, to: null});

  const [isPauseOn, setIsPauseOn] = useState<boolean>(true);

  const [visibleCalendar, setCalendarVisible] = useState<boolean>(false);

  const showCalendar = () => setCalendarVisible(true);
  const hideCalendar = () => setCalendarVisible(false);

  const formatedDate: string = format(new Date(selectedDate), 'dd.MM.yyyy', {locale: de});

  const errors: Partial<Record<keyof TimeLogForm, string>> = useMemo(() => {
    const result: Partial<Record<keyof TimeLogForm, string>> = {};

    if (!workTime.from) {
      result.workTimeFrom = 'Start time – required field';
    }

    if (!workTime.to) {
      result.workTimeTo = 'End time – required field';
    }

    if (workTime.from && workTime.to) {
      if (isEqual(workTime.to, workTime.from)) {
        result.workTimeTo = 'End time must be different from Start time';
      }

      if (isBefore(workTime.to, workTime.from)) {
        result.workTimeTo = 'End time must be after Start time';
      }

      if (isAfter(workTime.from, workTime.to)) {
        result.workTimeFrom = 'Start time must be before End time';
      }
    }

    return result;
  }, [workTime]);

  const hasFieldError = (fieldKey: keyof TimeLogForm): boolean => {
    return !!errors[fieldKey];
  };

  const onSubmit = (): void => {
    if (Object.keys(errors).some(err => !!err)) {
      setTouched({
        selectedDate: true,
        notes: true,
        workTimeFrom: true,
        workTimeTo: true,
      });
      return;
    }

    if (!user.id || !workTime.from || !workTime.to) return;

    const timeLog = new TimeLogDTO(
      workTime.from.getTime(),
      workTime.to.getTime(),
      isPauseOn ? minutesToMilliseconds(PAUSE_IN_MIN) : 0,
      Number(new Date(selectedDate)),
      notes,
    );

    dispatch(addTimeLog({userId: user.id, timeLog: timeLog}));

    navigation.navigate(SCREENS.TimesheetMain);
  };

  const onCancel = (): void => {
    navigation.navigate(SCREENS.TimesheetMain);
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

      <View>
        <Text style={styles.label}>
          Arbeitszeit <Text style={commonStyles.required}>*</Text>
        </Text>
        <TimeRangePicker time={workTime} onChange={values => setWorkTime(values)} />
        <View style={[commonStyles.rowWrap, commonStyles.justifyContentSpaceBetween]}>
          <HelperText type="error" visible={touched.workTimeFrom && hasFieldError('workTimeFrom')} padding="none">
            {errors.workTimeFrom}
          </HelperText>
          <HelperText type="error" visible={touched.workTimeTo && hasFieldError('workTimeTo')} padding="none">
            {errors.workTimeTo}
          </HelperText>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Pause</Text>
        <View style={[commonStyles.row]}>
          <TextInput value={isPauseOn ? `${PAUSE_IN_MIN} min` : '-'} editable={false} style={styles.pauseInput} />
          <Switch
            value={isPauseOn}
            onValueChange={() => setIsPauseOn(prevState => !prevState)}
            style={[{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}, commonStyles.mL20]}
          />
        </View>
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

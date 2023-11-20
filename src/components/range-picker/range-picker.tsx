// Libs
import React, {useState} from 'react';
import {Platform} from 'react-native';
import dayjs from 'dayjs';

// Components
import {View, Text, TouchableOpacity} from 'react-native';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import {TextInput} from 'react-native-paper';

// Theme
import colors from 'theme/colors';

// Types
import {StyleProp, ViewStyle} from 'react-native';

// Styles
import {commonStyles} from 'styles';
import styles from './styles';

interface PickerValues {
  startDate: Date;
  endDate: Date;
}

interface Props {
  values?: {startDate: Date; endDate: Date};
  mode?: DatePickerProps['mode'];
  startDatePlaceholder?: string;
  endDatePlaceholder?: string;
  label?: string;
  containerStyles?: StyleProp<ViewStyle>;
  required?: boolean;
  onChange?: (values: PickerValues) => void;
  valueFormatter?: (date: Date) => string;
}

const RangePicker: React.FC<Props> = props => {
  const {
    values,
    mode = 'datetime',
    startDatePlaceholder,
    endDatePlaceholder,
    label,
    containerStyles,
    required,
    onChange,
    valueFormatter,
  } = props;

  const [activeDatePicker, setActiveDatePicker] = useState<'startDate' | 'endDate' | null>(null);

  const [tempValues, setTempValues] = useState<Partial<PickerValues>>({});

  const openDatePicker = (type: typeof activeDatePicker): void => {
    if (!activeDatePicker) {
      setActiveDatePicker(type);
    }
  };

  const closeDatePicker = (): void => {
    setActiveDatePicker(null);
    setTempValues({});
  };

  const displayDate = (date?: Date): string => {
    if (!date) return '';
    if (valueFormatter) {
      return valueFormatter(date);
    }
    return dayjs(date).format(mode === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm');
  };

  const onChangeValue = async (newValues: Partial<PickerValues>): Promise<void> => {
    setActiveDatePicker(null);

    const _values: Partial<PickerValues> = {...tempValues, ...newValues};

    if (_values.startDate && _values.endDate) {
      onChange?.(_values as PickerValues);
      setTempValues({});
    } else if (_values.startDate) {
      setTempValues(prevState => ({...prevState, startDate: _values.startDate}));
      setActiveDatePicker('endDate');
    } else if (_values.endDate) {
      setTempValues(prevState => ({...prevState, endDate: _values.endDate}));
      setActiveDatePicker('startDate');
    }
  };

  const renderDatePicker = (): JSX.Element | null => {
    const startDate: Date | undefined = tempValues.startDate || values?.startDate;
    const endDate: Date | undefined = tempValues.endDate || values?.endDate;

    if (activeDatePicker === 'startDate') {
      return (
        <DatePicker
          modal
          mode={mode}
          title={startDatePlaceholder}
          open
          date={startDate || new Date()}
          maximumDate={endDate}
          onConfirm={(date: Date) => onChangeValue({startDate: date})}
          onCancel={closeDatePicker}
        />
      );
    }

    if (activeDatePicker === 'endDate') {
      return (
        <DatePicker
          modal
          mode={mode}
          open
          title={endDatePlaceholder}
          date={endDate || new Date()}
          minimumDate={startDate}
          onConfirm={(date: Date) => onChangeValue({endDate: date})}
          onCancel={closeDatePicker}
        />
      );
    }

    return null;
  };

  return (
    <View>
      {label && (
        <View style={[commonStyles.row, commonStyles.fS1, commonStyles.mB3]}>
          <Text style={[commonStyles.text, commonStyles.fS1]}>{label}</Text>
          {required && <Text style={[commonStyles.text, {color: colors.red}]}> *</Text>}
        </View>
      )}
      <View style={[styles.container, containerStyles]}>
        <View style={commonStyles.full}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={Platform.OS === 'android' ? () => openDatePicker('startDate') : undefined}>
            <TextInput
              editable={false}
              onPressIn={Platform.OS === 'ios' ? () => openDatePicker('startDate') : undefined}
              style={styles.inputStyles}
              placeholder={startDatePlaceholder}
              value={displayDate(tempValues?.startDate || values?.startDate)}
              underlineColor={'transparent'}
            />
          </TouchableOpacity>
          {activeDatePicker === 'startDate' && <View style={styles.activeDateFilter} />}
        </View>
        <View style={commonStyles.full}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={Platform.OS === 'android' ? () => openDatePicker('endDate') : undefined}>
            <TextInput
              editable={false}
              onPressIn={Platform.OS === 'ios' ? () => openDatePicker('endDate') : undefined}
              style={[styles.inputStyles]}
              placeholder={endDatePlaceholder}
              value={displayDate(tempValues?.endDate || values?.endDate)}
              underlineColor={'transparent'}
            />
          </TouchableOpacity>
          {activeDatePicker === 'endDate' && <View style={styles.activeDateFilter} />}
        </View>
        {renderDatePicker()}
      </View>
    </View>
  );
};

export default RangePicker;

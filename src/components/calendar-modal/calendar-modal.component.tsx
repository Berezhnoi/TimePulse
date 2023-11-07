// Libs
import React from 'react';

// Components
import {Calendar} from 'react-native-calendars';
import {Portal, Modal, Button} from 'react-native-paper';

// Types
import {CalendarModalProps} from './calendar-modal.types';

// Theme
import colors from 'theme/colors';

// Styles
import {commonStyles} from 'styles';
import styles from './calendar-modal.styles';

const CalendarModal: React.FC<CalendarModalProps> = ({
  selectedDate = '',
  visible = false,
  showOkButton = false,
  maxDate,
  onChangeDate,
  hideCalendar,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideCalendar}
        contentContainerStyle={[commonStyles.mH15, {backgroundColor: 'white'}]}>
        <Calendar
          onDayPress={day => {
            onChangeDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
          maxDate={maxDate}
        />
        {showOkButton && (
          <Button
            icon="check"
            textColor={colors.green}
            mode="contained-tonal"
            style={styles.okButton}
            onPress={hideCalendar}>
            OK
          </Button>
        )}
      </Modal>
    </Portal>
  );
};

export default CalendarModal;

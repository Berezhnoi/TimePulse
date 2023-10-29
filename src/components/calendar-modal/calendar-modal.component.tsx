// Libs
import React from 'react';

// Components
import {Calendar} from 'react-native-calendars';
import {Portal, Modal} from 'react-native-paper';

// Types
import {CalendarModalProps} from './calendar-modal.types';

// Styles
import {commonStyles} from 'styles';

const CalendarModal: React.FC<CalendarModalProps> = ({
  selectedDate = '',
  visible = false,
  onChangeDate,
  hideCalendar,
}) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideCalendar} contentContainerStyle={commonStyles.pH15}>
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
        />
      </Modal>
    </Portal>
  );
};

export default CalendarModal;

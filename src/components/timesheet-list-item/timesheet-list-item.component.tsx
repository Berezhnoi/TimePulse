// Libs
import React from 'react';
import dayjs from 'dayjs';

// Components
import {Text, View} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';

// Utils
import {calculateLogTime, millisecondsToMinutes} from 'utils';

// Types
import {TimesheetListItemProps} from './timesheet-list-item.types';

// Styles
import {commonStyles} from 'styles';
import styles from './timesheet-list-item.styles';

const TimesheetListItem: React.FC<TimesheetListItemProps> = ({item, onPress}) => {
  const {hours, minutes} = calculateLogTime(item);

  const displayDate = (date?: number): string => {
    if (!date) return '-';
    return dayjs(date).format('HH:mm');
  };

  const renderTitle = (): JSX.Element => {
    return (
      <View style={[commonStyles.row, commonStyles.justifyContentSpaceBetween, commonStyles.alignItemsCenter]}>
        <Text style={styles.primaryText}>
          {hours > 0 && (
            <>
              <Text style={styles.title}>{hours}</Text>
              <Text>h</Text>
            </>
          )}
          {minutes > 0 && (
            <>
              <Text style={styles.title}> {minutes}</Text>
              <Text>min</Text>
            </>
          )}
        </Text>

        <View style={commonStyles.row}>
          <Text style={commonStyles.text}>{displayDate(item.fromTime)}</Text>
          <Text style={[commonStyles.text, commonStyles.mH10]}>—</Text>
          <Text style={commonStyles.text}>{displayDate(item.toTime)}</Text>
        </View>
      </View>
    );
  };

  const renderPause = (): JSX.Element => {
    return (
      <View style={[commonStyles.row, commonStyles.justifyContentFlexEnd]}>
        <Text style={[commonStyles.text, styles.pauseContainer]}>Pause {millisecondsToMinutes(item.pause)} min</Text>
      </View>
    );
  };

  const renderNotes = (): JSX.Element => {
    return (
      <Text style={[commonStyles.text, commonStyles.fS1]} numberOfLines={1}>
        {item.notes}
      </Text>
    );
  };

  return (
    <View style={[commonStyles.row, commonStyles.pL15, commonStyles.pV10]}>
      <Avatar.Icon size={40} icon="calendar" style={[commonStyles.mR10]} />
      <View style={[commonStyles.fG1, commonStyles.fS1]}>
        {renderTitle()}
        {item.pause > 0 && renderPause()}
        {item.notes.length > 0 && renderNotes()}
      </View>
      <IconButton size={28} icon="eye" onPress={onPress} style={commonStyles.pR5} />
    </View>
  );
};

export default TimesheetListItem;

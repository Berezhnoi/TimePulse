// Libs
import React from 'react';

// Components
import {Text} from 'react-native';
import {Avatar, Card, IconButton} from 'react-native-paper';

// Types
import {TimesheetListItemProps} from './timesheet-list-item.types';

// Styles
import styles from './timesheet-list-item.styles';

const TimesheetListItem: React.FC<TimesheetListItemProps> = ({item}) => {
  return (
    <Card.Title
      title={
        <Text style={styles.primaryText}>
          <Text style={styles.title}>{`${item.loggedTime}`}</Text>h
        </Text>
      }
      subtitle={item.notes}
      left={props => <Avatar.Icon {...props} icon="calendar" />}
      right={props => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
    />
  );
};

export default TimesheetListItem;

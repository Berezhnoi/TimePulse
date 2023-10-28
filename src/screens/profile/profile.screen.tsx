// Libs
import React from 'react';

// Components
import {View, Text} from 'react-native';

// Types
import {ProfileScreenProps} from './profile.types';

// Styles
import styles from './profile.styles';

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;

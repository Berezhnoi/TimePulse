// Libs
import React from 'react';

// Components
import {View, Text} from 'react-native';

// Types
import {LoginScreenProps} from './login.types';

// Styles
import styles from './login.styles';

const LoginScreen: React.FC<LoginScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
    </View>
  );
};

export default LoginScreen;

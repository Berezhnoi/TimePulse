// Libs
import React from 'react';

// Components
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';

// Types
import {LoginScreenProps} from './login.types';

// Styles
import styles from './login.styles';

const LoginScreen: React.FC<LoginScreenProps> = () => {
  return (
    <View style={styles.container}>
      <TextInput label="Login" value={''} onChangeText={text => {}} />
      <TextInput label="Password" value={''} onChangeText={text => {}} />
    </View>
  );
};

export default LoginScreen;

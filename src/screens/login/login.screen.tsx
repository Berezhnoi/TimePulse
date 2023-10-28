// Libs
import React from 'react';

// Components
import {View, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

// Types
import {LoginScreenProps} from './login.types';

// Styles
import {commonStyles} from 'styles';
import styles from './login.styles';

const LoginScreen: React.FC<LoginScreenProps> = () => {
  return (
    <View style={styles.container}>
      <TextInput label="Username" value={''} onChangeText={text => {}} />
      <TextInput
        label="Password"
        value={''}
        onChangeText={text => {}}
        style={commonStyles.mT12}
      />
      <Button
        icon="home"
        mode="contained"
        onPress={() => console.log('Pressed')}
        style={commonStyles.mT25}>
        LOG IN
      </Button>
    </View>
  );
};

export default LoginScreen;

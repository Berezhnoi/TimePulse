// Libs
import React, {useState} from 'react';

// Components
import {View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';

// Hooks
import {useAppDispatch} from 'store';

// Actions
import {login} from 'store/slices/userSlice';

// Utils
import {UserDTO} from 'utils/UserDTO';

// Types
import {LoginScreenProps} from './login.types';

// Styles
import {commonStyles} from 'styles';
import styles from './login.styles';

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [validationError, setValidationError] = useState<boolean>(false);

  const onSubmit = (): void => {
    const users = ['igor', 'dana', 'julia', 'oksana', 'alex'];
    const isValidUsername: boolean =
      username === password && users.some(user => user.toLowerCase() === username.toLowerCase());

    if (isValidUsername) {
      dispatch(login(new UserDTO(username)));
    } else {
      setValidationError(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Username"
        value={username}
        autoCapitalize="none"
        onChangeText={value => {
          if (validationError) {
            setValidationError(false);
          }
          setUsername(value);
        }}
      />
      <TextInput
        label="Password"
        value={password}
        autoCapitalize="none"
        onChangeText={value => {
          if (validationError) {
            setValidationError(false);
          }
          setPassword(value);
        }}
        style={commonStyles.mT12}
      />

      <HelperText type="error" visible={validationError} padding="none">
        The username or password you entered is incorrect
      </HelperText>

      <Button icon="home" mode="contained" onPress={onSubmit} style={commonStyles.mT25} disabled={validationError}>
        LOG IN
      </Button>
    </View>
  );
};

export default LoginScreen;

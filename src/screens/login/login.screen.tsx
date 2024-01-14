// Libs
import React, {useState} from 'react';

// Components
import {View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';

// Hooks
import {useAppDispatch, useAppSelector} from 'store';
import {useTranslation} from 'react-i18next';

// Actions
import {login} from 'store/slices/userSlice';

// Types
import {User} from 'types/models/user';
import {LoginScreenProps} from './login.types';

// Styles
import {commonStyles} from 'styles';
import styles from './login.styles';

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user);

  const {t} = useTranslation('translation', {keyPrefix: 'auth'});

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [validationError, setValidationError] = useState<boolean>(false);

  const onSubmit = (): void => {
    const users = ['igor', 'dana', 'julia', 'oksana', 'alex'];
    const isValidUsername: boolean =
      username === password && users.some(user => user.toLowerCase() === username.toLowerCase());

    if (isValidUsername) {
      let userData: User = user.id === username ? (Object.assign({}, user) as any) : {id: username, username};
      if (username === 'oksana') {
        userData.name = 'Oksana';
        userData.surname = 'Jurgenson';
        userData.phoneNumber = '491749314510';
        userData.email = 'Oksana-jurgenson@t-online.de';
      }
      dispatch(login(userData));
    } else {
      setValidationError(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label={t('username')}
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
        label={t('password')}
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
        {t('incorrectCredentials')}
      </HelperText>

      <Button icon="home" mode="contained" onPress={onSubmit} style={commonStyles.mT25} disabled={validationError}>
        {t('login')}
      </Button>
    </View>
  );
};

export default LoginScreen;

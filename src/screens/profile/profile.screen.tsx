// Libs
import React, {useState} from 'react';

// Components
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import MaskInput from 'react-native-mask-input';

// Hooks
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Config
import {GermanyPhoneNumberMask} from 'config/mask';

// Types
import {ProfileScreenProps} from './profile.types';

// Styles
import {commonStyles} from 'styles';
import styles from './profile.styles';

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const insets = useSafeAreaInsets();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [values, setValues] = useState<{name: string; surname: string; email: string; phoneNumber: string}>({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
  });

  const onSave = async (): Promise<void> => {
    setIsEditMode(false);
  };

  const onChangeField = (fieldKey: keyof typeof values, fieldValue: (typeof values)[keyof typeof values]): void => {
    setValues(prevState => ({...prevState, [fieldKey]: fieldValue}));
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        {isEditMode ? (
          <Button icon="content-save-all-outline" mode="contained" style={styles.actionButton} onPress={onSave}>
            Save
          </Button>
        ) : (
          <Button icon="pencil" mode="contained" style={styles.actionButton} onPress={() => setIsEditMode(true)}>
            Edit
          </Button>
        )}
      </View>

      <TextInput
        editable={isEditMode}
        label="Name"
        value={values.name}
        onChangeText={text => onChangeField('name', text)}
        autoCapitalize="none"
      />

      <TextInput
        editable={isEditMode}
        label="Surname"
        value={values.surname}
        onChangeText={text => onChangeField('surname', text)}
        style={commonStyles.mT12}
        autoCapitalize="none"
      />

      <TextInput
        editable={isEditMode}
        label="Email"
        value={values.email}
        onChangeText={text => onChangeField('email', text)}
        style={commonStyles.mT12}
        autoCapitalize="none"
      />

      <TextInput
        editable={isEditMode}
        label="Phone Number"
        value={values.phoneNumber}
        style={commonStyles.mT12}
        autoCapitalize="none"
        render={props => (
          <MaskInput
            {...props}
            onChangeText={(masked, unmasked) => onChangeField('phoneNumber', unmasked)}
            mask={GermanyPhoneNumberMask}
          />
        )}
      />
    </View>
  );
};

export default ProfileScreen;

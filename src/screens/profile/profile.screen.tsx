// Libs
import React, {useMemo, useState} from 'react';

// Components
import {FlatList, Platform, Text, TouchableOpacity, View} from 'react-native';
import {Button, Modal, Portal, TextInput} from 'react-native-paper';
import MaskInput from 'react-native-mask-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Hooks
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from 'store';

// Actions
import {logout, setLanguage, updateUser} from 'store/slices/userSlice';

// Config
import {GermanyPhoneNumberMask} from 'config';

// Types
import {ProfileScreenProps} from './profile.types';

// Styles
import {commonStyles} from 'styles';
import styles from './profile.styles';

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const insets = useSafeAreaInsets();

  const {t, i18n} = useTranslation();

  const dispatch = useAppDispatch();

  const userData = useAppSelector(state => state.user);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [values, setValues] = useState<{name: string; surname: string; email: string; phoneNumber: string}>({
    name: userData.name || '',
    surname: userData.surname || '',
    email: userData.email || '',
    phoneNumber: userData.phoneNumber || '',
  });

  const [showLngModal, setShowLngModal] = useState<boolean>(false);

  const onSave = async (): Promise<void> => {
    dispatch(updateUser(values));
    setIsEditMode(false);
  };

  const onChangeField = (fieldKey: keyof typeof values, fieldValue: (typeof values)[keyof typeof values]): void => {
    setValues(prevState => ({...prevState, [fieldKey]: fieldValue}));
  };

  const openLngModal = (): void => {
    setShowLngModal(true);
  };

  const hideLngModal = (): void => {
    setShowLngModal(false);
  };

  const onChangeLng = (language: string): void => {
    dispatch(setLanguage({language: language}));
    hideLngModal();
  };

  const handleLogOut = (): void => {
    dispatch(logout());
  };

  const {
    languagesList,
    currenLanguage,
  }: {languagesList: Array<{label: string; value: string}>; currenLanguage: string} = useMemo(() => {
    const languagesList = ['de', 'en', 'pl', 'ru', 'sk'].map(languageKey => ({
      value: languageKey,
      label: i18n.t(`localization.${languageKey}`),
    }));

    const currenLanguage = languagesList.find(lng => lng.value === i18n.language)?.label || i18n.language;

    return {languagesList, currenLanguage};
  }, [i18n.language]);

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={30}
      enableOnAndroid={true}
      style={commonStyles.full}
      contentContainerStyle={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        {isEditMode ? (
          <Button icon="content-save-all-outline" mode="contained" style={styles.actionButton} onPress={onSave}>
            {t('general.save')}
          </Button>
        ) : (
          <Button icon="pencil" mode="contained" style={styles.actionButton} onPress={() => setIsEditMode(true)}>
            {t('general.edit')}
          </Button>
        )}
      </View>

      <TextInput
        editable={isEditMode}
        label={t('profile.name')}
        value={values.name}
        onChangeText={text => onChangeField('name', text)}
        autoCapitalize="none"
      />

      <TextInput
        editable={isEditMode}
        label={t('profile.surname')}
        value={values.surname}
        onChangeText={text => onChangeField('surname', text)}
        style={commonStyles.mT12}
        autoCapitalize="none"
      />

      <TextInput
        editable={isEditMode}
        label={t('profile.email')}
        value={values.email}
        onChangeText={text => onChangeField('email', text)}
        style={commonStyles.mT12}
        autoCapitalize="none"
      />

      <TextInput
        editable={isEditMode}
        label={t('profile.phoneNumber')}
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

      <TouchableOpacity
        activeOpacity={0.7}
        style={[commonStyles.mT12]}
        onPress={Platform.OS === 'android' ? openLngModal : undefined}>
        <TextInput
          label={t('localization.language')}
          value={currenLanguage}
          editable={false}
          onPressIn={Platform.OS === 'ios' ? openLngModal : undefined}
        />
      </TouchableOpacity>

      <Button mode="elevated" icon="logout" style={styles.logOutButton} onPress={handleLogOut}>
        {t('profile.logOut')}
      </Button>

      <Portal>
        <Modal
          visible={showLngModal}
          onDismiss={hideLngModal}
          contentContainerStyle={[commonStyles.mH15, {backgroundColor: 'white'}]}>
          <FlatList
            data={languagesList}
            renderItem={({item}) => (
              <TouchableOpacity activeOpacity={0.7} onPress={() => onChangeLng(item.value)} style={styles.lngListItem}>
                <Text key={item.value} style={styles.lngListItemText}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </Modal>
      </Portal>
    </KeyboardAwareScrollView>
  );
};

export default ProfileScreen;

import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import {de, en, pl, ru, sk} from './translations';

const resources = {
  de: {
    translation: de,
  },
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
  },
  ru: {
    translation: ru,
  },
  sk: {
    translation: sk,
  },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'de',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18next;

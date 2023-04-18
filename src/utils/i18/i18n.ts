import en from './json/en.json';
import ru from './json/ru.json';

import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
  lng: localStorage.getItem('lang') as string,
  fallbackLng: 'ru',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

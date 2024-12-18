import i18n from 'i18next';
import enLang from './lang/enLang';
import vnLang from './lang/vnLang';
import VNFlag from '../../assets/vietnam.png';
import ENFlag from '../../assets/united-kingdom.png';
import { initReactI18next } from 'react-i18next';

const languages = [
  {
    key: 'en',
    icon: ENFlag,
    title: 'English',
    resource: enLang,
  },
  {
    key: 'vn',
    icon: VNFlag,
    title: 'Vietnamese',
    resource: vnLang,
  },
];

const resources = {};

languages.forEach((item) => {
  resources[item.key] = {
    translation: item.resource,
  };
});

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources,
});

export { i18n, languages };

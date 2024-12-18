import { useTranslation } from 'react-i18next';

export default function useLanguages() {
  const { i18n } = useTranslation();

  return {
    changeLanguage: i18n.changeLanguage,
    currentLang: i18n.language,
  };
}

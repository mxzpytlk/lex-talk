import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { LocalStorageKey } from './core/enums/local-storage-key';
import { Language } from './core/enums/languages';

export const DEFAULT_LANG: Language = (localStorage.getItem(LocalStorageKey.LANG) as Language) || Language.EN;

(i18n as any)
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(({
    fallbackLng: DEFAULT_LANG,
    debug: false,
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
      wait: false,
    },
  }));

export default i18n;

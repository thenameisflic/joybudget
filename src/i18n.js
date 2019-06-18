import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import numeral from "numeral";
import "numeral/locales/pt-br";
import "numeral/locales/bg";
import "numeral/locales/cs";
import "numeral/locales/da-dk";
import "numeral/locales/de-ch";
import "numeral/locales/de";
import "numeral/locales/en-au";
import "numeral/locales/en-gb";
import "numeral/locales/en-za";
import "numeral/locales/es-es";
import "numeral/locales/es";
import "numeral/locales/et";
import "numeral/locales/fi";
import "numeral/locales/fr-ca";
import "numeral/locales/fr-ch";
import "numeral/locales/fr";
import "numeral/locales/hu";
import "numeral/locales/it";
import "numeral/locales/ja";
import "numeral/locales/lv";
import "numeral/locales/nl-be";
import "numeral/locales/nl-nl";
import "numeral/locales/no";
import "numeral/locales/pl";
import "numeral/locales/pt-pt";
import "numeral/locales/ru-ua";
import "numeral/locales/ru";
import "numeral/locales/sk";
import "numeral/locales/sl";
import "numeral/locales/th";
import "numeral/locales/tr";
import "numeral/locales/uk-ua";
import "numeral/locales/vi";

export default (onDone) => 
  i18n
    // load translation using xhr -> see /public/locales
    // learn more: https://github.com/i18next/i18next-xhr-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      fallbackLng: 'en',
      debug: true,

      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },

      react: {
        wait: true
      }
    })
    .then(() => {
      if (numeral.locales[i18n.language.toLowerCase()])
        numeral.locale(i18n.language.toLowerCase());
      else if (i18n.language === 'pt')
        numeral.locale('pt-br');
      else
        numeral.locale('en');
      onDone();
    });

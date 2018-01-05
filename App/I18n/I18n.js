// @flow

import I18n from 'react-native-i18n'

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

// English language is the main language for fallback:
I18n.translations = {
  en: require('./languages/english.json')
};

let languageCode = I18n.locale.substr(0, 2);

// All other translations for the app goes to the respective language file:
switch (languageCode) {
  case 'de':
    I18n.translations.de = require('./languages/de.json');
    break;
  case 'fr':
    I18n.translations.fr = require('./languages/fr.json');
    break;
  case 'pl':
    I18n.translations.pl = require('./languages/pl.json');
    break;
}

import i18next from '../../localization/i18n.config';

class LocaleService {
  public static changeLanguage(languageCode: string) {
    i18next.changeLanguage(languageCode);
  }
}

export default LocaleService;

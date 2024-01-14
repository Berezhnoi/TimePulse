// Libs
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

// Navigation
import Navigator from 'navigation/index';

// Services
import {LocaleService} from 'services';

// Store
import {useAppSelector} from 'store/index';

function App(): JSX.Element {
  const language = useAppSelector(state => state.user?.language);

  useEffect(() => {
    if (language) {
      LocaleService.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  return <Navigator />;
}

export default App;

// Libs
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

// Providers
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {PaperProvider} from 'react-native-paper';

// Navigation
import Navigator from 'navigation/index';

// Store
import {store, persistor} from 'store/index';

function App(): JSX.Element {
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            <Navigator />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;

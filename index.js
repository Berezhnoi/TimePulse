// Libs
import {AppRegistry} from 'react-native';

// Providers
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {PaperProvider} from 'react-native-paper';

// Store
import {store, persistor} from './src/store';

// Initialize localization
import './localization/i18n.config';

import App from './App';
import {name as appName} from './app.json';

const ReactApp = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            <App />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

AppRegistry.registerComponent(appName, () => ReactApp);

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import Navigator from 'navigation/index';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Navigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;

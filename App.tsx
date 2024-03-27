import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SchemeStackNavigator } from './src/AppNavigation';
import AppStartup from './src/AppStartup';
import { Provider } from 'react-redux';
import { TamaguiProvider } from 'tamagui';
import config from './tamagui.config';
import store from './src/storage/store';

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <Provider store={store}>
        <AppStartup>
          <NavigationContainer>
            <SchemeStackNavigator />
          </NavigationContainer>
        </AppStartup>
      </Provider>
    </TamaguiProvider>
  );
}

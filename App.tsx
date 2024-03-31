import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SchemeStackNavigator } from './src/AppNavigation';
import AppStartup from './src/AppStartup';
import { Provider } from 'react-redux';
import { TamaguiProvider } from 'tamagui';
import config from './tamagui.config';
import store from './src/storage/store';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={config}>
        <BottomSheetModalProvider>
          <Provider store={store}>
            <AppStartup>
              <NavigationContainer>
                <SchemeStackNavigator />
              </NavigationContainer>
            </AppStartup>
          </Provider>
        </BottomSheetModalProvider>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}

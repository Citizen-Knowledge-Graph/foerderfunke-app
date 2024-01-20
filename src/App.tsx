import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './AppNavigation';
import AppStartup from './AppStartup';
import { Provider } from 'react-redux';
import store from './storage/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppStartup>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </AppStartup>
    </Provider>
  );
};

export default App;
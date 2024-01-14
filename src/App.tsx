// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './screens/MainScreen'; 
import SecondScreen from './screens/SecondScreen'; 
import { loadInitialData, readProjectDir, readTestFile } from './services/fileManagement';
import { loadToShapes } from './services/validator';


const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    loadInitialData();
    loadToShapes("citizen-a.ttl")
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={MainScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Second" 
          component={SecondScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
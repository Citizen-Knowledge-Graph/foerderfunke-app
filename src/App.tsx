// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen'; // Adjust the path as needed

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={MainScreen} 
          options={{ headerShown: false }}  // Add this line        
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
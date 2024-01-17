// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MainScreen from './screens/MainScreen';
import HomeScreen from './screens/HomeScreen';
import { loadInitialData, readProjectDir, readTestFile } from './services/fileManagement';
import { loadToShapes, createValidationReport } from './services/validator';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#384361',
          paddingBottom: 5,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#007bff', // Color of the icon and text when the tab is active
        tabBarInactiveTintColor: '#8e8e93', // Color of the icon and text when the tab is inactive
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={({ route }) => ({ // Include route in the function parameters
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome name={"home"} size={size} color={color} />;
          },
        })} />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ route }) => ({ // Include route in the function parameters
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome name={"home"} size={size} color={color} />;
          },
        })} />
    </Tab.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    loadInitialData();

    const runValidation = async () => {
      try {
        const funding_profile = await loadToShapes("citizen-solar-funding.ttl");
        const citizen = await loadToShapes("citizen-b.ttl");
        const validationReport = await createValidationReport(funding_profile, citizen);
        console.log(`Validation conforms: ${validationReport.report.conforms}`);
      } catch (error) {
        console.log(error)
        // Handle the error
      }
    };
    runValidation()
  }, []);

  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default App;
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import StartScreen from './screens/StartScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SchemeScreen from './screens/SchemeScreen';
import GuideScreen from './screens/GuideScreen';
import UpdateProfileScreen from './screens/UpdateProfileScreen';

// Stack Navigation
const Stack = createStackNavigator();

export const SchemeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StartStackScreen"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTabNavigator"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SchemeStackScreen"
        component={SchemeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GuideStackScreen"
        component={GuideScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateProfileStackScreen"
        component={UpdateProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Tab Navigation
const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
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
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ route }) => ({
          // Include route in the function parameters
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome name={'home'} size={size} color={color} />;
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          // Include route in the function parameters
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome name={'home'} size={size} color={color} />;
          },
        })}
      />
    </Tab.Navigator>
  );
};

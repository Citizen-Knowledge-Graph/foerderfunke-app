import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import StartScreen from './screens/StartScreen';
import HomeScreen from './screens/homescreen/HomeScreen';
import ProfileScreen from './screens/profilescreen/ProfileScreen';
import SchemeScreen from './screens/schemescreen/SchemeScreen';
import JourneyScreen from './screens/journeyscreen/JourneyScreen';
import OnboardingScreen from './screens/onboarding/OnboardingScreen';

// Stack Navigation
const Stack = createStackNavigator();

export const SchemeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='StartStackScreen'
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='JourneyStackScreen'
        component={JourneyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='OnboardingStackScreen'
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='MainTabNavigator'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SchemeStackScreen'
        component={SchemeScreen}
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
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          marginBottom: 5,
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          }
          return <FontAwesomeIcon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={({ route }) => ({
          headerShown: false,
        })}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={({ route }) => ({
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
};

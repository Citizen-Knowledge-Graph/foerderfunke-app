import React from 'react';
import { StyleSheet } from 'react-native';
import ScreenView from '../../components/ScreenView';
import { Button, YStack } from 'tamagui';

const JourneyScreen = ({ navigation }) => {
  return (
    <ScreenView screenName={'Choose your Journey'}>
      <YStack gap={10}>
        <Button onPress={() => navigation.navigate('MainTabNavigator')}>
          Pre-defined User Profile
        </Button>
        <Button onPress={() => navigation.navigate('OnboardingStackScreen')}>
          Build a new User Profile
        </Button>
      </YStack>
    </ScreenView>
  );
};

export default JourneyScreen;

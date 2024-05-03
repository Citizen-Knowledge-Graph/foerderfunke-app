import React from 'react';
import ScreenView from '../../components/ScreenView';
import { Button, YStack } from 'tamagui';
import { useUserStore } from '../../storage/zustand';

const JourneyScreen = ({ navigation }) => {
  const updateUserId = useUserStore((state) => state.updateUserId);

  return (
    <ScreenView screenName={'Choose your Journey'}>
      <YStack gap={10}>
        <Button onPress={() => navigation.navigate('MainTabNavigator')}>
          Pre-defined User Profile
        </Button>
        <Button
          onPress={() => {
            updateUserId('user-template');
            navigation.navigate('OnboardingStackScreen');
          }}
        >
          Build a new User Profile
        </Button>
      </YStack>
    </ScreenView>
  );
};

export default JourneyScreen;

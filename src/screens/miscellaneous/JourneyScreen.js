import React from 'react';
import ScreenView from '../../components/ScreenView';
import { Button, YStack } from 'tamagui';
import { useUserStore } from '../../storage/zustand';

const JourneyScreen = ({ navigation }) => {
  const updateUserId = useUserStore((state) => state.updateUserId);

  return (
    <ScreenView screenName={'Choose your Journey'}>
      <YStack gap={10}>
        <Button
          onPress={() => {
            navigation.removeListener;
            navigation.navigate('MainTabNavigator');
          }}
        >
          I have been here before!
        </Button>
        <Button
          onPress={() => {
            updateUserId('user-template');
            navigation.removeListener;
            navigation.navigate('ChoiceStackScreen');
          }}
        >
          You are new here!
        </Button>
      </YStack>
    </ScreenView>
  );
};

export default JourneyScreen;

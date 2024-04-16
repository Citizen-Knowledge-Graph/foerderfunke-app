import React from 'react';
import ScreenView from '../../components/ScreenView';
import { Button, YStack } from 'tamagui';
import { useDispatch } from 'react-redux';
import selectUser from '../../storage/actions/selectUserReport';

const JourneyScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <ScreenView screenName={'Choose your Journey'}>
      <YStack gap={10}>
        <Button onPress={() => navigation.navigate('MainTabNavigator')}>
          Pre-defined User Profile
        </Button>
        <Button
          onPress={() => {
            dispatch(selectUser('user-template'));
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

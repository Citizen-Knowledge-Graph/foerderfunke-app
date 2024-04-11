import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { SizableText, Card, XStack, YStack, Button, View } from 'tamagui';
import FullScreenView from './components/FullScreenView';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation(); // Use the useNavigation hook

  return (
    <FullScreenView>
      <XStack alignSelf='center' backgroundColor={'white'}>
        <YStack flex={1}>
          <DemoCard title={'Tell us your name'} />
          <DemoCard title={'When is your birthday?'} />
          <DemoCard title={'What do you do?'} />
          <DemoCard title={'Do you have kids?'} />
          <DemoCard title={'How is the weather?'} />
          <YStack
            flex={1}
            alignSelf={'center'}
            justifyContent={'center'}
            style={styles.fullScreenContainer}
          >
            <Button onPress={() => navigation.navigate('MainTabNavigator')}>
              Go to Home Screen
            </Button>
          </YStack>
        </YStack>
      </XStack>
    </FullScreenView>
  );
};

export default OnboardingScreen;

export function DemoCard(props) {
  return (
    <Card {...props} style={styles.fullScreenContainer}>
      <YStack flex={1} alignSelf={'center'} justifyContent={'center'}>
        <SizableText style={styles.titleText}> {props.title} </SizableText>
      </YStack>
    </Card>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    height: height,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 24,
    color: 'black',
  },
});

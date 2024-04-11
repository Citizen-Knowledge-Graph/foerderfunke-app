import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import ScreenView from '../../components/ScreenView';
import {
  SizableText,
  Card,
  H2,
  Paragraph,
  XStack,
  Button,
  YStack,
} from 'tamagui';

const OnboardingScreen = () => {
  return (
    <ScreenView screenName={'Onboarding'}>
      <SizableText size={20}>Onboarding Screen</SizableText>
      <XStack alignSelf='center'>
        <YStack flex={1} gap='$5' padding='$2'>
          <DemoCard title={'Tell us your name'} />
          <DemoCard title={'When is your birthday?'} />
          <DemoCard title={'What do you do?'} />
          <DemoCard title={'Do you have kids?'} />
        </YStack>
      </XStack>
    </ScreenView>
  );
};

export default OnboardingScreen;

export function DemoCard(props) {
  return (
    <Card elevate size='$4' bordered {...props}>
      <Card.Header padded>
        <H2>{props.title}</H2>
        <Paragraph theme='alt2'>Now available</Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Button borderRadius='$10'>Purchase</Button>
      </Card.Footer>
    </Card>
  );
}

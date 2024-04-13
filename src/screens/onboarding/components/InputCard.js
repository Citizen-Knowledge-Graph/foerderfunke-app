import { Card, SizableText, YStack } from 'tamagui';
import { Dimensions, StyleSheet } from 'react-native';
import React from 'react';

const { height } = Dimensions.get('window');

const InputCard = ({ entry }) => {
  return (
    <Card style={styles.fullScreenContainer}>
      <YStack flex={1} alignSelf={'center'} justifyContent={'center'}>
        <SizableText style={styles.titleText}> {entry.title} </SizableText>
      </YStack>
    </Card>
  );
};

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

export default InputCard;

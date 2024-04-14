import React, { useState } from 'react';
import { TextInput, Dimensions, StyleSheet } from 'react-native';
import { Card, SizableText, YStack, Button, View, XStack } from 'tamagui';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { performUpdate } from '../../../storage/actions/userUpdateReport';
import { useDispatch } from 'react-redux';

const { height } = Dimensions.get('window');

const InputCard = ({ entry, scrollToPrev, scrollToNext, currentIndex }) => {
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();

  return (
    <Card style={styles.fullScreenContainer}>
      <YStack
        flex={1}
        alignSelf={'center'}
        justifyContent={'space-between'}
        paddingVertical={60}
      >
        <XStack justifyContent={'center'}>
          {currentIndex > 0 ? (
            <Button
              icon={<ChevronUp size='$2' color={'black'} />}
              title='Prev'
              onPress={scrollToPrev}
              style={styles.navigationButton}
            />
          ) : (
            <View style={{ height: 60, width: 60 }} />
          )}
        </XStack>
        <YStack gap={15}>
          <SizableText style={styles.titleText}> {entry.title} </SizableText>
          <TextInput
            size='$4'
            style={styles.inputField}
            onChangeText={setInputText}
          />
        </YStack>
        <XStack justifyContent={'center'}>
          <Button
            icon={<ChevronDown size='$2' color={'black'} />}
            title='Next'
            onPress={() => {
              //dispatch(performUpdate(entry, inputText));
              scrollToNext();
            }}
            style={styles.navigationButton}
          />
        </XStack>
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
  inputField: {
    height: 40,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  navigationButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});

export default InputCard;

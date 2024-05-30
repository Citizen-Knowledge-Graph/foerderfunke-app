import React, { useState, useEffect } from 'react';
import { XStack, YStack, SizableText, Card, Button } from 'tamagui';
import 'react-native-get-random-values';
import { colorTokens } from '@tamagui/themes';
import { StyleSheet } from 'react-native';
import ProfileInputIconMap from './ProfileInputIconMap';
import { ChevronRight, X } from '@tamagui/lucide-icons';

const ObjectInput = ({ setInputData }) => {
  const [counter, setCounter] = useState(0);
  const [objectLinks, setObjectLinks] = useState(['Child Number 1']);

  useEffect(() => {
    setInputData(counter);
  }, [counter, setInputData]);

  return (
    <YStack gap={20} flex={1}>
      <XStack justifyContent={'flex-start'}>
        <Card style={styles.buttonCard} onPress={() => setCounter(counter + 1)}>
          <SizableText size='$5' style={styles.buttonCardText}>
            Hinzufügen{counter}
          </SizableText>
        </Card>
      </XStack>
      {objectLinks.map((link, index) => (
        <XStack id={index} justifyContent={'space-between'}>
          <XStack gap={16} alignItems={'center'}>
            <Card style={styles.iconContainer}>
              <ProfileInputIconMap id={'ff:hasChild'} />
            </Card>
            <SizableText size='$8' style={styles.objectCardText}>
              {link}
            </SizableText>
          </XStack>
          <XStack gap={0} justifyContent={'flex-end'} alignItems={'center'}>
            <Button
              style={styles.objectButton}
              backgroundColor={'white'}
              icon={<X size='$1' color={'black'} />}
              pressStyle={{
                backgroundColor: colorTokens.light.gray.gray8,
                borderColor: 'white',
              }}
            />
            <Button
              style={styles.objectButton}
              backgroundColor={'white'}
              icon={<ChevronRight size='$1' color={'black'} />}
              pressStyle={{
                backgroundColor: colorTokens.light.gray.gray8,
                borderColor: 'white',
              }}
            />
          </XStack>
        </XStack>
      ))}
    </YStack>
  );
};

const styles = StyleSheet.create({
  buttonCard: {
    backgroundColor: colorTokens.light.green.green8,
    borderRadius: 25,
    padding: 10,
  },
  buttonCardText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  objectCardText: {
    color: 'black',
    textAlign: 'left',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  iconContainer: {
    backgroundColor: colorTokens.light.yellow.yellow7,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
  },
  objectButton: {
    height: 40,
    width: 40,
  },
});

export default ObjectInput;

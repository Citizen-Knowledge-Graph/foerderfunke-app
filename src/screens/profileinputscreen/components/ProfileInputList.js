import React, { useState, useRef } from 'react';
import { Button, Card, SizableText, XStack, YStack, View } from 'tamagui';
import { ChevronLeft, ChevronRight, Info } from '@tamagui/lucide-icons';
import ProfileInputCard from './ProfileInputCard';
import { colorTokens } from '@tamagui/themes';
import { StyleSheet, ScrollView } from 'react-native';

const ProfileInputList = ({ title, profileInputData }) => {
  const [visibleCount, setVisibleCount] = useState(1);
  const scrollViewRef = useRef(null);

  const increaseVisibleCount = () => {
    if (visibleCount < profileInputData.profileInputFields.length - 1) {
      setVisibleCount(visibleCount + 1);
      setTimeout(
        () => scrollViewRef.current.scrollToEnd({ animated: true }),
        0
      );
    }
  };

  const decreaseVisibleCount = () => {
    if (visibleCount > 1) {
      setVisibleCount(visibleCount - 1);
    }
  };

  return (
    <ScrollView ref={scrollViewRef}>
      <YStack gap={20}>
        <XStack justifyContent={'center'}>
          <SizableText size='$9' style={styles.titleText} flex={1}>
            {title}
          </SizableText>
        </XStack>
        <YStack>
          <XStack justifyContent={'center'}>
            <Card style={styles.infoCard} flex={1}>
              <YStack flex={1} justifyContent={'flex-end'}>
                <XStack
                  justifyContent={'center'}
                  paddingHorizontal={8}
                  gap={10}
                >
                  <Info size='$1' color={'black'} />
                  <SizableText size='$5' style={styles.infoCardText}>
                    Let’s start your profile to discover social benefits for
                    you. If you need help, you can always use the info icon.
                  </SizableText>
                </XStack>
              </YStack>
            </Card>
          </XStack>
        </YStack>
        <YStack gap={30}>
          {profileInputData.profileInputFields
            .slice(0, visibleCount)
            .map((item, index) => (
              <ProfileInputCard key={index} item={item} />
            ))}
        </YStack>
        <XStack
          justifyContent={'space-between'}
          gap={20}
          style={styles.confirmPane}
        >
          {visibleCount > 1 ? (
            <Button
              icon={<ChevronLeft size='$1' color={'black'} />}
              onPress={() => decreaseVisibleCount()}
              style={styles.navigationButton}
              pressStyle={{
                backgroundColor: colorTokens.light.gray.gray8,
              }}
            />
          ) : (
            <View />
          )}
          <Button
            iconAfter={<ChevronRight size='$1' color={'black'} />}
            onPress={() => increaseVisibleCount()}
            style={styles.navigationButton}
            pressStyle={{
              backgroundColor: colorTokens.light.gray.gray8,
            }}
          >
            Next
          </Button>
        </XStack>
      </YStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    fontWeight: 'bold',
  },
  subTitleText: {
    color: 'black',
  },
  infoCard: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colorTokens.light.blue.blue5,
  },
  infoCardText: {
    color: 'black',
  },
  confirmPane: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
  },
  navigationButton: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
  },
});

export default ProfileInputList;

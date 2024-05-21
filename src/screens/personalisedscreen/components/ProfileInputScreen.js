import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import ScreenView from '../../../components/ScreenView';
import { SizableText, XStack, YStack, Card, Button } from 'tamagui';
import { colorTokens } from '@tamagui/themes';
import { ChevronLeft, ChevronRight, Info } from '@tamagui/lucide-icons';
import ProfileInputCard from './ProfileInputCard';

const ProfileInputScreen = ({ route }) => {
  const { title } = route.params;
  const [visibleCount, setVisibleCount] = useState(1);

  const data = [
    { title: 'First name' },
    { title: 'Last name' },
    { title: 'Email' },
    { title: 'Phone number' },
    { title: 'Address' },
    // Add more items as needed
  ];

  const increaseVisibleCount = () => {
    if (visibleCount < data.length - 1) {
      setVisibleCount(visibleCount + 1);
    }
  };

  const decreaseVisibleCount = () => {
    if (visibleCount > 1) {
      setVisibleCount(visibleCount - 1);
    }
  };

  return (
    <ScreenView screenName={title} backButton={true} showName={false}>
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
          {data.slice(0, visibleCount).map((item, index) => (
            <ProfileInputCard key={index} title={item.title} />
          ))}
        </YStack>
        <XStack
          justifyContent={'space-between'}
          gap={20}
          style={styles.confirmPane}
        >
          <Button
            icon={<ChevronLeft size='$1' color={'black'} />}
            onPress={() => decreaseVisibleCount()}
            style={styles.navigationButton}
            pressStyle={{
              backgroundColor: colorTokens.light.gray.gray8,
            }}
          />
          <Button
            icon={<ChevronRight size='$1' color={'black'} />}
            onPress={() => increaseVisibleCount()}
            style={styles.navigationButton}
            pressStyle={{
              backgroundColor: colorTokens.light.gray.gray8,
            }}
          />
        </XStack>
      </YStack>
    </ScreenView>
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
  },
});

export default ProfileInputScreen;

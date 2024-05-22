import React from 'react';
import { XStack, SizableText, Card, Button } from 'tamagui';
import { colorTokens } from '@tamagui/themes';
import { StyleSheet } from 'react-native';
import { ChevronRight } from '@tamagui/lucide-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileSectionItem = ({
  icon,
  title,
  id,
  active,
  personalisedScreenData,
}) => {
  const navigation = useNavigation(); // Use the useNavigation hook

  const backgroundColor = active
    ? colorTokens.light.yellow.yellow8
    : colorTokens.light.gray.gray8;

  return (
    <XStack
      gap={16}
      justifyContent={'space-between'}
      alignItems={'center'}
      flex={1}
    >
      <XStack gap={16} alignItems={'center'}>
        <Card style={[styles.iconContainer, { backgroundColor }]}>{icon}</Card>
        <SizableText size='$8' style={styles.sectionTitle}>
          {title}
        </SizableText>
      </XStack>
      <Button
        backgroundColor={'white'}
        icon={<ChevronRight size='$1' color={'black'} />}
        pressStyle={{
          backgroundColor: colorTokens.light.gray.gray8,
          borderColor: 'white',
        }}
        onPress={() =>
          navigation.navigate('ProfileInputStackScreen', { title, id })
        }
      />
    </XStack>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
  },
  sectionTitle: {
    color: 'black',
    fontWeight: '300',
  },
});

export default ProfileSectionItem;

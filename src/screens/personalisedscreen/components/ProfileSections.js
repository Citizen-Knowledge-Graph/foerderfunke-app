import React from 'react';
import { StyleSheet } from 'react-native';
import { SizableText, XStack, YStack } from 'tamagui';
import ProfileSectionItem from './ProfileSectionItem';
import { Briefcase, Smile, Coins, Book, Baby } from '@tamagui/lucide-icons';

const ProfileSections = ({ activeSection, setActiveSection }) => {
  return (
    <YStack gap={10}>
      <XStack justifyContent={'center'}>
        <SizableText size='$9' style={styles.titleText} flex={1}>
          Your profile
        </SizableText>
      </XStack>
      <YStack gap={16}>
        <ProfileSectionItem
          title={'About you'}
          id={'about-you'}
          icon={<Smile size='$3' color='black' />}
          active={activeSection === 'about-you'}
        />
        <ProfileSectionItem
          title={'Job'}
          id={'job'}
          icon={<Briefcase size='$3' color='black' />}
          active={activeSection === 'job'}
        />
        <ProfileSectionItem
          title={'Income'}
          id={'income'}
          icon={<Coins size='$3' color='black' />}
          active={activeSection === 'income'}
        />
        <ProfileSectionItem
          title={'Education'}
          id={'education'}
          icon={<Book size='$3' color='black' />}
          active={activeSection === 'education'}
        />
        <ProfileSectionItem
          title={'Children'}
          id={'children'}
          icon={<Baby size='$3' color='black' />}
          active={activeSection === 'children'}
        />
      </YStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    fontWeight: '400',
  },
  subTitleText: {
    color: 'black',
  },
});

export default ProfileSections;

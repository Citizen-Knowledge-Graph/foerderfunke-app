import React from 'react';
import { Baby, Book, Briefcase, Coins, Smile } from '@tamagui/lucide-icons';

const ProfileIconMap = ({ id }) => {
  switch (id) {
    case 'about-you':
      return <Smile size='$3' color='black' />;
    case 'job':
      return <Briefcase size='$3' color='black' />;
    case 'income':
      return <Coins size='$3' color='black' />;
    case 'education':
      return <Book size='$3' color='black' />;
    case 'children':
      return <Baby size='$3' color='black' />;
  }
};

export default ProfileIconMap;

import React from 'react';
import { Baby, Book, Briefcase, Coins, Smile } from '@tamagui/lucide-icons';

const ProfileInputIconMap = ({ id }) => {
  switch (id) {
    case 'ff:hasChild':
      return <Baby size='$3' color='black' />;
  }
};

export default ProfileInputIconMap;

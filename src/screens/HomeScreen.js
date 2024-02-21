import React from 'react';
import ScreenView from '../components/ScreenView';
import InfoSection from '../components/InfoSection';
import SupportList from '../components/SupportList';
import ScrollItem from '../components/ScrollItem';
import ButtonSection from '../components/ButtonSection';

// Component
const HomeScreen = () => {
  return (
    <ScreenView screenName={'Home'}>
      <ScrollItem>
        <ButtonSection />
      </ScrollItem>
      <ScrollItem>
        <SupportList />
      </ScrollItem>
      <ScrollItem>
        <InfoSection />
      </ScrollItem>
    </ScreenView>
  );
};

export default HomeScreen;

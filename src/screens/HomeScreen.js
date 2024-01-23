import React from 'react';
import { useSelector } from 'react-redux';
import ScreenView from '../components/ScreenView';
import InfoSection from '../components/InfoSection';
import FörderungenList from '../components/SupportList';
import ScrollItem from '../components/ScrollItem';

// Component
const HomeScreen = () => {
  return (
    <ScreenView screenName={"Home"}>
      <ScrollItem>
        <InfoSection />
      </ScrollItem>
      <ScrollItem>
        <FörderungenList />
      </ScrollItem>
    </ScreenView>
  );
};

export default HomeScreen;

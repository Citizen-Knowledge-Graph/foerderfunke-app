import React from 'react';
import ScreenView from '../components/generic/ScreenView';
import SupportList from '../components/collage/SupportList';

// Component
const HomeScreen = () => {
  return (
    <ScreenView screenName={'Deine Förderungen'}>
      <SupportList />
    </ScreenView>
  );
};

export default HomeScreen;

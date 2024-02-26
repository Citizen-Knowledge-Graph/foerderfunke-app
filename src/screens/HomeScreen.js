import React from 'react';
import ScreenView from '../components/ScreenView';
import SupportList from '../components/SupportList';
import ScrollItem from '../components/ScrollItem';

// Component
const HomeScreen = () => {
  return (
    <ScreenView screenName={'Home'}>
      <ScrollItem>
        <SupportList />
      </ScrollItem>
    </ScreenView>
  );
};

export default HomeScreen;

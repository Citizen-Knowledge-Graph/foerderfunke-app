import React, { useEffect, useState } from 'react';
import ScreenView from '../../components/ScreenView';
import SupportList from './components/SupportList';
import { useSelector } from 'react-redux';
import { fetchHomeScreenData } from './HomeScreenController';

const HomeScreen = () => {
  const validationUpdateState = useSelector(
    (state) => state.validationUpdateReducer
  );
  const [homeScreenData, setHomeScreenData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newHomeScreenData = await fetchHomeScreenData();
        setHomeScreenData(newHomeScreenData);
      } catch (error) {
        console.error('Failed to fetch home screen data:', error);
      }
    };

    fetchData();
  }, [validationUpdateState]);

  return (
    <ScreenView screenName={'Fördermöglichkeiten'}>
      {homeScreenData && <SupportList homeScreenData={homeScreenData} />}
    </ScreenView>
  );
};

export default HomeScreen;

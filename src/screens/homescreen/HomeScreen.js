import React, {useEffect, useState} from 'react';
import ScreenView from '../../components/generic/ScreenView';
import SupportList from '../../components/collage/SupportList';
import {useSelector} from 'react-redux';
import {fetchHomeScreenData} from './HomeScreenController';
import {Text} from 'react-native';

const HomeScreen = () => {
  const [homeScreenData, setHomeScreenData] = useState(null);
  const validationState = useSelector(state => state.validationReducer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newHomeScreenData = await fetchHomeScreenData(validationState);
        setHomeScreenData(newHomeScreenData);
        console.log(newHomeScreenData);
      } catch (error) {
        console.error('Failed to fetch home screen data:', error);
      }
    };

    fetchData();
  }, [validationState]);

  return (
    <ScreenView screenName={'Deine Förderungen'}>
      {homeScreenData && <SupportList homeScreenData={homeScreenData} />}
    </ScreenView>
  );
};

export default HomeScreen;

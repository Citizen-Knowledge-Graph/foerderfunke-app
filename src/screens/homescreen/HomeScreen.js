import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import ScreenView from '../../components/ScreenView';
import SupportList from './components/SupportList';
import { useSelector } from 'react-redux';
import { fetchHomeScreenData, fetchNonEligibles } from './HomeScreenController';

const HomeScreen = () => {
  const [eligibles, setEligibles] = useState(null);
  const [nonEligibles, setNonEligibles] = useState(null);
  const validationState = useSelector((state) => state.validationReducer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newHomeScreenData = await fetchHomeScreenData(validationState);
        setEligibles(newHomeScreenData);
        const nonEligiblesData = await fetchNonEligibles(validationState);
        setNonEligibles(nonEligiblesData);
      } catch (error) {
        console.error('Failed to fetch home screen data:', error);
      }
    };

    fetchData();
  }, [validationState]);

  return (
    <ScreenView screenName={'Fördermöglichkeiten'}>
      {eligibles && <SupportList homeScreenData={eligibles} />}
      <Text>Not eligible:</Text>
      {nonEligibles &&
        nonEligibles.map((item) => <Text key={item.key}>{item.key}</Text>)}
    </ScreenView>
  );
};

export default HomeScreen;

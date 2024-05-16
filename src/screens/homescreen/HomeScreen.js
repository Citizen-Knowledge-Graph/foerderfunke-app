import React, { useEffect, useState } from 'react';
import ScreenView from '../../components/ScreenView';
import SupportList from './components/SupportList';
import { fetchHomeScreenData } from './HomeScreenController';
import { useValidationReportStore, useMetadataStore } from '../../storage/zustand';

const HomeScreen = () => {
  const [homeScreenData, setHomeScreenData] = useState(null);
  const validationReports = useValidationReportStore(
    (state) => state.validationReport
  );
  const metadata = useMetadataStore((state) => state.metadata);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newHomeScreenData = await fetchHomeScreenData(validationReports, metadata);
        setHomeScreenData(newHomeScreenData);
      } catch (error) {
        console.error('Failed to fetch home screen data:', error);
      }
    };

    fetchData();
  }, [validationReports]);

  return (
    <ScreenView screenName={'Fördermöglichkeiten'}>
      {homeScreenData && <SupportList homeScreenData={homeScreenData} />}
    </ScreenView>
  );
};

export default HomeScreen;

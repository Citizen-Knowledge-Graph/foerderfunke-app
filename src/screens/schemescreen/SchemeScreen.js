import React, { useEffect, useState } from 'react';
import ScreenView from '../../components/ScreenView';
import SchemeInfo from './components/SchemeInfo';
import { fetchSchemeScreenData } from './SchemeScreenController';

const SchemeScreen = ({ route }) => {
  const { scheme, details } = route.params;
  const [schemeScreenData, setSchemeScreenData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let newSchemeScreenData = await fetchSchemeScreenData(scheme);
        newSchemeScreenData.details = details;
        setSchemeScreenData(newSchemeScreenData);
      } catch (error) {
        console.error('Failed to fetch home screen data:', error);
      }
    };

    fetchData();
  }, [scheme]);

  return (
    <ScreenView screenName={schemeScreenData?.data?.title} backButton={true}>
      {schemeScreenData ? (
        <SchemeInfo schemeScreenData={schemeScreenData} />
      ) : null}
    </ScreenView>
  );
};

export default SchemeScreen;

// {schemeScreenData && <SchemeInfo data={schemeScreenData} />}

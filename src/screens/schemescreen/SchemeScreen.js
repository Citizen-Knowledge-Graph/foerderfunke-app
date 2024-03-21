import React, {useEffect, useState} from 'react';
import ScreenView from '../../components/generic/ScreenView';
import SchemeInfo from '../../components/collage/SchemeInfo';
import {Text} from 'react-native';
import {fetchSchemeScreenData} from './SchemeScreenController';

const SchemeScreen = ({route}) => {
  const {scheme} = route.params;
  const [schemeScreenData, setSchemeScreenData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newSchemeScreenData = await fetchSchemeScreenData(scheme);
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

import React, {useEffect, useState} from 'react';
import ScreenView from '../components/generic/ScreenView';
import SchemeInfo from '../components/collage/SchemeInfo';
import fetchHydrationData from '../controllers/hydration';

const SchemeScreen = ({route}) => {
  const [data, setData] = useState({title: '', sub_title: '', steps: []});
  const {id} = route.params;

  useEffect(() => {
    const loadData = async () => {
      const hydrationData = await fetchHydrationData(id, 'QUERY');

      setData(hydrationData);
    };

    loadData();
  }, [route]);

  return (
    <ScreenView screenName={data.title} backButton={true}>
      <SchemeInfo data={data} />
    </ScreenView>
  );
};

export default SchemeScreen;

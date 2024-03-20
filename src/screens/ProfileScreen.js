import React, {useEffect, useState} from 'react';
import ScreenView from '../components/generic/ScreenView';
import UserProfile from '../components/collage/UserProfile';
import {useSelector} from 'react-redux';

// Component
const ProfileScreen = () => {
  // handle all data and logic here and render according to data
  const [profileScreenData, setProfileScreenData] = useState(null);
  const userState = useSelector(state => state.validationReducer);

  useEffect(() => {
    setProfileScreenData('test');
    //
    // we only want to use actions to update the state
    // here need to retrieve the list of active schemes, send these ids to our
    // flat file storage api and retrieve the corresponding data points
    // profileScreenData = retrieveProfileScreenData()
  }, []);

  return (
    <ScreenView screenName={'Profile'}>
      {profileScreenData ? <UserProfile /> : null}
    </ScreenView>
  );
};

export default ProfileScreen;

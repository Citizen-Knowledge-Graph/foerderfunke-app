import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import fetchDataToDevice from './controllers/dataFetching';
import runValidation from './controllers/validation';
import * as FileSystem from 'expo-file-system';
import {Asset} from 'expo-asset';

const AppStartup = ({children}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeData = async () => {
      // Fetch data from bundle to device - this will be API call later
      const files = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory,
      );
      console.log('files: ', files);

      const asset = await Asset.loadAsync(
        require('../assets/data/user-profile.ttl'),
      );
      console.log('userprofile: ', asset);

      //await fetchDataToDevice();

      // Run initial validation
      //await runValidation(dispatch);
    };

    initializeData();
  }, [dispatch]);

  return <>{children}</>;
};

export default AppStartup;

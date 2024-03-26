import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchDataToDevice from './controllers/dataFetching';
import runValidation from './controllers/validation';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import JSZip from 'jszip';
import base64 from 'react-native-base64';

const AppStartup = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeData = async () => {
      // Fetch data from bundle to device - this will be API call later
      await fetchDataToDevice();

      // Run initial validation
      await runValidation(dispatch);
    };

    initializeData();
  }, [dispatch]);

  return <>{children}</>;
};

export default AppStartup;

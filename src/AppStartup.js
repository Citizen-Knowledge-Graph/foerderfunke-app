import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import fetchDataToDevice from './controllers/dataFetching';
import runValidation from './controllers/validation';
import loadDataIntoRedux from './controllers/dataService';
import {func} from '@foerderfunke/matching-engine';

const AppStartup = ({children}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeData = async () => {
      // Fetch data from bundle to device - this will be API call later
      await fetchDataToDevice();

      // Run initial validation
      await runValidation(dispatch);

      func();
    };

    initializeData();
  }, [dispatch]);

  return <>{children}</>;
};

export default AppStartup;

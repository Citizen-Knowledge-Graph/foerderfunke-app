import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchDataToDevice from './controllers/dataFetching';
import runValidation from './controllers/validation';
import selectUserReportAction from './storage/actions/selectUserReport';

const AppStartup = ({ children }) => {
  const dispatch = useDispatch();
  const initialUser = 'profile-a';

  useEffect(() => {
    const initializeData = async () => {
      // Fetch data from bundle to device - this will be API call later
      await fetchDataToDevice();

      // Set initial user
      dispatch(selectUserReportAction(initialUser));

      // Run initial validation
      await runValidation(dispatch);
    };

    initializeData();
  }, [dispatch]);

  return <>{children}</>;
};

export default AppStartup;

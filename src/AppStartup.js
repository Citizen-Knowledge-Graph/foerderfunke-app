import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchDataToDevice from './controllers/dataFetching';
import runValidation from './controllers/validation';
import selectUser from './storage/actions/selectUserReport';

const AppStartup = ({ children }) => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.selectUserReducer);
  const initialUser = 'profile-a';

  // initialize data on app startup
  useEffect(() => {
    const initializeData = async () => {
      // Fetch data from bundle to device - this will be API call later
      await fetchDataToDevice();

      // Set initial user
      dispatch(selectUser(initialUser));

      // Run initial validation
      await runValidation(dispatch);
    };

    initializeData();
  }, [dispatch]);

  // re-run validation on user change
  useEffect(() => {
    runValidation(dispatch);
  }, [dispatch, selectedUser]);

  return <>{children}</>;
};

export default AppStartup;

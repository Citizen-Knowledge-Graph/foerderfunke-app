import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchDataToDevice from './controllers/dataFetching';
import runValidation from './controllers/validation';
import selectUser from './storage/actions/selectUserReport';
import { performValidationUpdate } from './storage/actions/validationUpdateReport';

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
      dispatch(performValidationUpdate());
    };

    initializeData();
  }, [dispatch]);

  // re-run validation on user change
  useEffect(() => {
    dispatch(performValidationUpdate());
  }, [dispatch, selectedUser]);

  return <>{children}</>;
};

export default AppStartup;

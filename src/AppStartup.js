import React, { useEffect, useState } from 'react';
import fetchDataToDevice from './controllers/dataFetching';
import { setResourceLocations } from './AppData';
import { useUserStore, useUserUpdateStore } from './storage/zustand';
import runValidation from './controllers/validation';

const AppStartup = ({ children }) => {
  const userId = useUserStore((state) => state.userId);
  const userUpdate = useUserUpdateStore((state) => state.updateCounter);
  const [dataFetched, setDataFetched] = useState(false);

  // initialize data on app startup
  useEffect(() => {
    const initializeData = async () => {
      // set resource locations
      await setResourceLocations();

      // fetch data to device
      if (!dataFetched) {
        await fetchDataToDevice();
        setDataFetched(true);
      }
    };

    initializeData();
  }, [dataFetched, userId, userUpdate]);

  // run validation on user change
  useEffect(() => {
    const updateValidation = async () => {
      if (dataFetched) {
        await runValidation(userId);
      }
    };

    updateValidation();
  }, [userId, userUpdate, dataFetched]);

  return <>{children}</>;
};

export default AppStartup;

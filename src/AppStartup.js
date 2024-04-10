import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchDataToDevice from './controllers/dataFetching';
import { performValidationUpdate } from './storage/actions/validationUpdateReport';

const AppStartup = ({ children }) => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.selectUserReducer);
  const userUpdate = useSelector((state) => state.userUpdateReducer);
  const [dataFetched, setDataFetched] = useState(false);

  // initialize data on app startup
  useEffect(() => {
    const initializeData = async () => {
      if (!dataFetched) {
        await fetchDataToDevice();
        setDataFetched(true);
      }
    };

    initializeData();
  }, [dispatch, dataFetched, selectedUser]);

  // run validation on user change
  useEffect(() => {
    if (dataFetched) {
      dispatch(performValidationUpdate(selectedUser));
    }
  }, [dispatch, selectedUser, userUpdate, dataFetched]);

  return <>{children}</>;
};

export default AppStartup;

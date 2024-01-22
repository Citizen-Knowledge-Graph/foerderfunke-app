import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchDataToDevice from './services/dataFetching';
import runValidation from './services/validation';

const AppStartup = ({ children }) => {
    const dispatch = useDispatch();


    useEffect(() => {
        // Fetch data from bundle to device - this will be API call later
        fetchDataToDevice();

        // Run initial validation
        try {
            runValidation(dispatch);
        } catch (error) {
            console.log("validation failed: ", error)
        }

    }, [dispatch]);

    return <>{children}</>
};

export default AppStartup;
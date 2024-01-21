import React, { useEffect } from 'react';
import fetchDataToDevice from './services/dataFetching';
import runValidation from './services/validation';

const AppStartup = ({ children }) => {
    useEffect(() => {
        // Fetch data from bundle to device - this will be API call later
        fetchDataToDevice();

        // Run initial validation
        runValidation();

    }, []);

    return <>{children}</>
};

export default AppStartup;
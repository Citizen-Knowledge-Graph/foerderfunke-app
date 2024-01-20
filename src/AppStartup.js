import React, { useEffect } from 'react';
import fetchDataToDevice from './services/dataFetching';

const AppStartup = ({ children }) => {
    useEffect(() => {
        // Fetch data from bundle to device - this will be API call later
        fetchDataToDevice();
    }, []);

    return <>{children}</>
};

export default AppStartup;
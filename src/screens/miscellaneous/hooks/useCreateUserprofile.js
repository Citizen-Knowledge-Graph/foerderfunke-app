import { useCallback } from 'react';

function useCreateUserprofile() {
  return useCallback(() => {
    console.log('we are creating a new user here');
  }, []);
}

export default useCreateUserprofile;

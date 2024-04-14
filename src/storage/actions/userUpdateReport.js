import { updateUserProfile } from '../../screens/profilescreen/ProfileScreenController';

export const INITIATE_USER_UPDATE = 'INITIATE_USER_UPDATE';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

export const initiateUserUpdate = () => ({
  type: INITIATE_USER_UPDATE,
});

export const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS,
});

export const performUpdate =
  (entry, updateValue) => async (dispatch, getState) => {
    const { selectUserReducer } = getState();

    dispatch(initiateUserUpdate());

    try {
      await updateUserProfile(selectUserReducer, entry, updateValue);
      dispatch(updateUserSuccess());
      console.log('User update succeeded');
    } catch (error) {
      console.error('User update failed:', error);
    }
  };

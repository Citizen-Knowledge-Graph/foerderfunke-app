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
  (selectedUser, entry, updateValue) => async (dispatch) => {
    dispatch(initiateUserUpdate());

    try {
      await updateUserProfile(selectedUser, entry, updateValue);
      dispatch(updateUserSuccess());
      console.log('User update succeeded');
    } catch (error) {
      console.error('User update failed:', error);
    }
  };

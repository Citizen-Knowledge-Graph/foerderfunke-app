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
  (field, object, updateValue) => async (dispatch, getState) => {
    const { selectUserReducer } = getState();

    dispatch(initiateUserUpdate());

    try {
      console.log('Selected user:', selectUserReducer);
      console.log('Field:', field);
      console.log('Object:', object);
      console.log('Update value:', updateValue);
      await updateUserProfile(selectUserReducer, field, object, updateValue);
      dispatch(updateUserSuccess());
      console.log('User update succeeded');
    } catch (error) {
      console.error('User update failed:', error);
    }
  };

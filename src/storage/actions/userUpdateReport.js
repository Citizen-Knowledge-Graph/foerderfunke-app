import { updateUserProfile } from '../../screens/profilescreen/ProfileScreenController';

export const INITIATE_UPDATE = 'INITIATE_UPDATE';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';

export const initiateUpdate = () => ({
  type: INITIATE_UPDATE,
});

export const updateSuccess = () => ({
  type: UPDATE_SUCCESS,
});

export const performUpdate = (entry, updateValue) => async (dispatch) => {
  dispatch(initiateUpdate());

  try {
    await updateUserProfile(entry, updateValue);
    dispatch(updateSuccess());
    console.log('update succeeded');
  } catch (error) {
    console.error('Update failed:', error);
  }
};

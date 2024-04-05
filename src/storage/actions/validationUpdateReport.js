import runValidation from '../../controllers/validation';

export const INITIATE_UPDATE = 'INITIATE_UPDATE';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';

export const initiateUpdate = () => ({
  type: INITIATE_UPDATE,
});

export const updateSuccess = () => ({
  type: UPDATE_SUCCESS,
});

export const performValidationUpdate = () => async (dispatch) => {
  dispatch(initiateUpdate());

  try {
    await runValidation(dispatch);
    dispatch(updateSuccess());
    console.log('update succeeded');
  } catch (error) {
    console.error('Update failed:', error);
  }
};

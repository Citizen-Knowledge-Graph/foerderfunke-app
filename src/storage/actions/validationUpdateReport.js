import runValidation from '../../controllers/validation';

export const INITIATE_VALIDATION_UPDATE = 'INITIATE_VALIDATION_UPDATE';
export const UPDATE_VALIDATION_SUCCESS = 'UPDATE_VALIDATION_SUCCESS';

export const initiateValidationUpdate = () => ({
  type: INITIATE_VALIDATION_UPDATE,
});

export const updateValidationSuccess = () => ({
  type: UPDATE_VALIDATION_SUCCESS,
});

export const performValidationUpdate = (selectedUser) => async (dispatch) => {
  dispatch(initiateValidationUpdate());

  try {
    await runValidation(dispatch, selectedUser);
    dispatch(updateValidationSuccess());
    console.log('Validation update succeeded');
  } catch (error) {
    console.error('Validation update failed:', error);
  }
};

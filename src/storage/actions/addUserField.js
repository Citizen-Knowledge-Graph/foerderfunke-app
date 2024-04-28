import { addUserProfileField } from '../../screens/onboarding/OnboardingController';

export const INITIATE_ADD_USER_FIELD = 'INITIATE_ADD_USER_FIELD';
export const ADD_USER_FIELD_SUCCESS = 'ADD_USER_FIELD_SUCCESS';

export const initiateAddUserField = () => ({
  type: INITIATE_ADD_USER_FIELD,
});

export const addUserFieldSuccess = () => ({
  type: ADD_USER_FIELD_SUCCESS,
});

export const performAdd =
  (field, constraints, value, term) => async (dispatch, getState) => {
    const { selectUserReducer } = getState();

    dispatch(initiateAddUserField());

    try {
      console.log('Selected user:', selectUserReducer);
      console.log('Field:', field);
      console.log('New value:', value);
      await addUserProfileField(
        selectUserReducer,
        field,
        constraints,
        value,
        term
      );
      dispatch(addUserFieldSuccess());
      console.log('User update succeeded');
    } catch (error) {
      console.error('User update failed:', error);
    }
  };

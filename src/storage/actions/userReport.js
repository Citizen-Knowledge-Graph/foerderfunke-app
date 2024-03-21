import {updatePredicatedObject} from '../../utilities/graphManagement';

export const INITIATE_UPDATE = 'INITIATE_UPDATE';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';

export const initiateUpdate = () => ({
  type: INITIATE_UPDATE,
});

export const updateSuccess = () => ({
  type: UPDATE_SUCCESS,
});

// Simulated asynchronous database update function
const simulateDbUpdate = () =>
  new Promise(resolve => setTimeout(resolve, 2000));

// Thunk action creator
export const performUpdate =
  (identifier, initialValue, updateValue) => async dispatch => {
    dispatch(initiateUpdate());

    try {
      updatePredicatedObject(identifier, initialValue, updateValue);
      await simulateDbUpdate(identifier, initialValue);
      console.log('update succeeded');
      dispatch(updateSuccess());
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

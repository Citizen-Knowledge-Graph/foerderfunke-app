import {
  INITIATE_VALIDATION_UPDATE,
  UPDATE_VALIDATION_SUCCESS,
} from '../actions/validationUpdateReport';

const initialState = {
  status: 'idle',
};

const validationUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_VALIDATION_UPDATE:
      return { ...state, status: 'updating' };
    case UPDATE_VALIDATION_SUCCESS:
      return { ...state, status: 'updated' };
    default:
      return state;
  }
};

export default validationUpdateReducer;

import { INITIATE_UPDATE, UPDATE_SUCCESS } from '../actions/userUpdateReport';

const initialState = {
  status: 'idle',
};

const validationUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_UPDATE:
      return { ...state, status: 'updating' };
    case UPDATE_SUCCESS:
      return { ...state, status: 'updated' };
    default:
      return state;
  }
};

export default validationUpdateReducer;

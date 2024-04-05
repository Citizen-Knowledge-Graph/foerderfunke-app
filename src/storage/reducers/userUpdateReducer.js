import {
  INITIATE_USER_UPDATE,
  UPDATE_USER_SUCCESS,
} from '../actions/userUpdateReport';

const initialState = {
  status: 'idle',
};

const userUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_USER_UPDATE:
      return { ...state, status: 'updating' };
    case UPDATE_USER_SUCCESS:
      return { ...state, status: 'updated' };
    default:
      return state;
  }
};

export default userUpdateReducer;

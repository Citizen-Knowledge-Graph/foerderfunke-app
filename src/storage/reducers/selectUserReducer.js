import { SELECT_USER_REPORT } from '../actions/selectUserReport';

const initialState = {
  userId: 'profile-a',
};

const selectUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_USER_REPORT:
      return {
        userId: action.payload.userId,
      };
    default:
      return state;
  }
};

export default selectUserReducer;

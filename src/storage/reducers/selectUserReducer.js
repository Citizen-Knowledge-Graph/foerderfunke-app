import { SELECT_USER_REPORT } from '../actions/selectUserReport';

const selectUserReducer = (state = {}, action) => {
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

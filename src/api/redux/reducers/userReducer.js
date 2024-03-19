import {USER_REPORT} from '../actions/userReport';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REPORT:
      return {
        ...state,
        [action.payload.key]: action.payload.report,
      };
    default:
      return state;
  }
};

export default userReducer;

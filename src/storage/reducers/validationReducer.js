import { VALIDATION_REPORT } from '../actions/validationReport';

const validationReducer = (state = {}, action) => {
  switch (action.type) {
    case VALIDATION_REPORT:
      return {
        ...state,
        payload: action.payload.report,
      };
    default:
      return state;
  }
};

export default validationReducer;

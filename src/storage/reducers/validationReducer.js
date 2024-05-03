import { VALIDATION_REPORT } from '../actions/validationReport';

const validationReducer = (state = {}, action) => {
  switch (action.type) {
    case VALIDATION_REPORT:
      return {
        ...state,
        report: action.report,
      };
    default:
      return state;
  }
};

export default validationReducer;

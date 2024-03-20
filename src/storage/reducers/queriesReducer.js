import {QUERIES_REPORT} from '../actions/queriesReport';

const queriesReducer = (state = {}, action) => {
  switch (action.type) {
    case QUERIES_REPORT:
      return {
        ...state,
        [action.payload.key]: action.payload.report,
      };
    default:
      return state;
  }
};

export default queriesReducer;

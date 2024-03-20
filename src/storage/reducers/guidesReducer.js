import {GUIDES_REPORT} from '../actions/guidesReport';

const guidesReducer = (state = {}, action) => {
  switch (action.type) {
    case GUIDES_REPORT:
      return {
        ...state,
        [action.payload.key]: action.payload.report,
      };
    default:
      return state;
  }
};

export default guidesReducer;

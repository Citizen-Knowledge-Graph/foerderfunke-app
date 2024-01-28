import { combineReducers } from 'redux';
import validationReducer from './validationReducer';
import queriesReducer from './queriesReducer';
import guidesReducer from './guidesReducer';

const rootReducer = combineReducers({
  validationReducer,
  queriesReducer,
  guidesReducer
});

export default rootReducer;

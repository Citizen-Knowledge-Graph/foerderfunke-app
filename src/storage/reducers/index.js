import { combineReducers } from 'redux';
import validationReducer from './validationReducer';
import queriesReducer from './queriesReducer';
import guidesReducer from './guidesReducer';

const rootReducer = combineReducers({
  validationReducer: validationReducer,
  queriesReducer: queriesReducer,
  guidesReducer: guidesReducer
});

export default rootReducer;

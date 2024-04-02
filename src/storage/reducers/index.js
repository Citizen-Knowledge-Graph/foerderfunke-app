import { combineReducers } from 'redux';
import validationReducer from './validationReducer';
import queriesReducer from './queriesReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  validationReducer: validationReducer,
  queriesReducer: queriesReducer,
  userReducer: userReducer,
});

export default rootReducer;

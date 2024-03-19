import {combineReducers} from 'redux';
import validationReducer from './validationReducer';
import queriesReducer from './queriesReducer';
import guidesReducer from './guidesReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  validationReducer: validationReducer,
  queriesReducer: queriesReducer,
  guidesReducer: guidesReducer,
  userReducer: userReducer,
});

export default rootReducer;

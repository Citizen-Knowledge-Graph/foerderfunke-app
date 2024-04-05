import { combineReducers } from 'redux';
import validationReducer from './validationReducer';
import userUpdateReducer from './userUpdateReducer';
import selectUserReducer from './selectUserReducer';

const rootReducer = combineReducers({
  validationReducer: validationReducer,
  userReducer: userUpdateReducer,
  selectUserReducer: selectUserReducer,
});

export default rootReducer;

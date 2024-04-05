import { combineReducers } from 'redux';
import validationReducer from './validationReducer';
import userUpdateReducer from './userUpdateReducer';
import selectUserReducer from './selectUserReducer';
import validationUpdateReducer from './validationUpdateReducer';

const rootReducer = combineReducers({
  validationReducer: validationReducer,
  userReducer: userUpdateReducer,
  selectUserReducer: selectUserReducer,
  validationUpdateReducer: validationUpdateReducer,
});

export default rootReducer;

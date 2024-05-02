import { combineReducers } from 'redux';
import validationReducer from './validationReducer';
import userUpdateReducer from './userUpdateReducer';
import selectUserReducer from './selectUserReducer';
import validationUpdateReducer from './validationUpdateReducer';
import onboardingReducer from './onboardingReducer';

const rootReducer = combineReducers({
  validationReducer: validationReducer,
  userUpdateReducer: userUpdateReducer,
  selectUserReducer: selectUserReducer,
  validationUpdateReducer: validationUpdateReducer,
  onboardingReducer: onboardingReducer,
});

export default rootReducer;

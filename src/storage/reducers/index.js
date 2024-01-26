import {combineReducers} from 'redux';
import validationReducer from './validationReducer';
import registryReducer from './registryReducer';

const rootReducer = combineReducers({
  validationReducer,
  registryReducer,
});

export default rootReducer;

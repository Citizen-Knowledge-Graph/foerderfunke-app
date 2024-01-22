import { combineReducers } from 'redux';
import validationReducer from './validationReducer';

const rootReducer = combineReducers({
    validationReducer, // Add your reducers here
    // otherReducer,
});

export default rootReducer;
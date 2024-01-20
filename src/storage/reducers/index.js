import { combineReducers } from 'redux';
import initialReducer from './initialReducer';

const rootReducer = combineReducers({
    initialReducer, // Add your reducers here
    // otherReducer,
});

export default rootReducer;
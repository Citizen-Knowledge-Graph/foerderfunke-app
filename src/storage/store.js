import {applyMiddleware} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import rdfMiddleware from './middlewares/rdfMiddleware';

const store = configureStore(
  {reducer: rootReducer},
  applyMiddleware(thunk, rdfMiddleware),
);

export default store;

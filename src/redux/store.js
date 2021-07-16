import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import  { productsReducer } from './productsReducer';

/* const reducers = {}
const rootReducer = combineReducers(reducers); */

export const configureStore = () => createStore(productsReducer,applyMiddleware(thunk, logger));


import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { products} from './productsReducer';

const reducers = {
    products
};


const rootReducer = combineReducers(reducers);


export const configureStore = () => createStore(rootReducer,applyMiddleware(thunk));
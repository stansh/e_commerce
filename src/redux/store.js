import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { productsReducer } from './productsReducer';
import { persistReducer} from 'redux-persist';
import { cartReducer } from "./cartReducer";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";



const rootReducer = combineReducers({
    cart: cartReducer,
    products:productsReducer
})


const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}
 const persistedreducer = persistReducer(persistConfig, productsReducer) 

//const persistedreducer = persistReducer(persistConfig,rootReducer)

export const configureStore = () => createStore(persistedreducer,applyMiddleware(thunk, logger));

//export const configureStore = () => createStore(persistedreducer,applyMiddleware(thunk, logger));
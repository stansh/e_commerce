import { createStore, combineReducers, applyMiddleware,compose } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { productsReducer } from './productsReducer';
import { persistReducer} from 'redux-persist';
import { cartReducer } from "./cartReducer";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";



const rootReducer = combineReducers({
   productsReducer,
   cartReducer
  
})


const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}
 //const persistedreducer = persistReducer(persistConfig, rootReducer);
   

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const configureStore = () => createStore (
   // persistedreducer,
   rootReducer,
   composeEnhancers(applyMiddleware(thunk, logger))
)
  
    


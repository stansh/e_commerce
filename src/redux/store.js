import { createStore, combineReducers, applyMiddleware,compose } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { productsReducer } from './productsReducer';
import { persistReducer,persistStore} from 'redux-persist';
import { cartReducer } from "./cartReducer";
import storage from 'redux-persist/lib/storage';
//import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// Redux Persist Configuration
const persistConfig = {
    key: 'root', // key for localStorage
    storage,     // type of storage to use
    // whitelist: ['cartReducer'], reducers to persist (optional)
  };
  
  const rootReducer = combineReducers({
    productsReducer,
    cartReducer,
  });
  
  // Wrap the rootReducer with persistReducer
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  // Enable Redux DevTools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  // Create the store with the persisted reducer
  export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
  );
  
  // Export persistor for use with PersistGate
  export const persistor = persistStore(store);




  // const rootReducer = combineReducers({
//    productsReducer,
//    cartReducer
  
// })

// const persistConfig = {
//     key: 'root',
//     storage,
//     stateReconciler: autoMergeLevel2,
// } 
// const persistedreducer = persistReducer(persistConfig,null);
   
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const configureStore = () => createStore (
//     //persistedreducer,
//     rootReducer,
//     composeEnhancers(applyMiddleware(thunk, logger))
// )

  
    


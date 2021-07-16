import  { createStore,applyMiddleware}  from "redux";
import thunk from 'redux-thunk';



const url = 'https://fakestoreapi.com/products';
const initialState = {
  loading: false,
  products: [],
  error: ''
}

const LOAD_PRODUCTS_BEGIN = 'LOAD_PRODUCTS_BEGIN';
 const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
 const LOADING_FAILDED = 'LOADING_FAILED';

const loadProductsBegin = () => {
  return {
    type: LOAD_PRODUCTS_BEGIN
  }
}

const loadProductsSuccess = products => {
  return {
    type: LOAD_PRODUCTS_SUCCESS,
    payload: products
  }
}

const loadingFailed = errMess => {
  return {
    type:  LOADING_FAILDED,
    payload: errMess
  }
}

export const fetchProducts = () => dispatch => { // arrow function inside an arrow function (redux-thunk enables that)
  dispatch(loadProductsBegin()); //dispatches  campsitesLoading action

  return fetch(url) // location of  the resource
  .then(response => {
          if (response.ok) { // true if HTTP response status cose is within 200 - 299
               return response;
          } else {
              const error = new Error(`Error ${response.status}: ${response.statusText}`);  // bad response from server  
              error.response = response;
              throw error;
          }
      },
      error => { // no response from server at all
          const errMess = new Error(error.message);
          throw errMess;
    }
  )
  .then(response => response.json()) // converts data to JSon
  .then(campsites => dispatch(loadProductsSuccess(campsites)))
  .catch(error => dispatch(loadingFailed(error.message)));
};

export const productsReducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case LOAD_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true
      }
    case LOAD_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        error: ''
      }
    case LOADING_FAILDED :
      return {
        loading: false,
        products: [],
        error: action.payload
      }
     default:
        return state;  
  }
}

export const store = createStore(productsReducer, applyMiddleware(thunk))
 store.subscribe(() => {console.log(store.getState()) })
store.dispatch(fetchProducts()) 
import * as actions from './actions'

const url = 'https://fakestoreapi.com/products';

 
export const fetchProducts = () => dispatch => { 
    dispatch(productsLoading());
    return fetch(url)
    
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
    .then(res => res.json())
    .then(products => dispatch(loadProductsSuccess(products)))
    .catch(error => dispatch(loadingFailed(error)));
    };
 
      


    
export const productsLoading = () => ({
    type: actions.PRODUCTS_LOADING
    }); 

export const loadProductsSuccess = products => ({
    type: actions.LOAD_PRODUCTS_SUCCESS,
    payload: products
});

export const loadingFailed = errMess => ({
    type: actions.LOADING_FAILDED,
    payload: errMess
});


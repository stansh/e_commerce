import * as actions from './actions'

const url = 'https://fakestoreapi.com/products';


export const fetchProducts = () => dispatch => {
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
        

        .then(response => response.json())
        .then(products => dispatch(loadProducts(products)))
        .catch(error=>dispatch(loadingFailed(error.message)));
    };


    export const loadProducts = products => ({
        type: actions.LOAD_PRODUCTS,
        payload: products
    });

    export const loadingFailed = errMess => ({
        type: actions.LOADING_FAILDED,
        payload: errMess
    });
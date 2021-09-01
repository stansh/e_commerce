import * as actions from './actions'
import { productsData } from "../shared/productsData";
//import { configureStore } from './store';

/* const url = 'https://fakestoreapi.com/products'; */

//const url = 'https://my-json-server.typicode.com/jubs16/Products/Products'
const url = 'http://localhost:3000'
 
 export const fetchProducts = () => dispatch => { 
    console.log(productsData)
     console.log(' fetchProducts')
   dispatch(productsLoading());
    return fetch(url + '/products')
    
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
    //.then(res => console.log("DATA:", res))
    .then(res => dispatch(loadProductsSuccess(res)))
    .then(res => console.log("DATA:", res))
    .catch(error => dispatch(loadingFailed(error)))
    };
  
      
/* export const loadProductsData = () => dispatch => {
        dispatch(loadProductsSuccess(productsData))
    } */
    
    
export const productsLoading = () => ({
    type: actions.PRODUCTS_LOADING
    }); 

export const loadProductsSuccess = data => ({
    type: actions.LOAD_PRODUCTS_SUCCESS,
    payload: data
});

export const loadingFailed = errMess => ({
    type: actions.LOADING_FAILDED,
    payload: errMess
});

export const search = keywords => ({
    type: actions.SHOW_SEARCH_RESULTS,
    payload: keywords
})


//CART actions

 export const addProductToCart = productItem  => ({
    type: actions.ADD_PRODUCT_TO_CART,
    payload: productItem
}) 

export const removeProductFromCart = productItem => ({
    type: actions.REMOVE_PRODUCT_FROM_CART,
    payload: productItem
})

export const qtyUp = id  => ({
    type: actions.CART_QTY_UP,
    payload: id 

})

export const qtyDown = id => ({
    type: actions.CART_QTY_DOWN,
    payload: id

})



// updating Cart in Database

export const postNewCartItem = (productItem) => dispatch => {
 
   const newCartItem = Object.create(productItem);
   console.log(productItem)
   return fetch ('http://localhost:3000/cart', {
       method: 'POST',
       body: JSON.stringify(newCartItem),
       headers: {
        "Content-Type": "application/json" 
        }
     })
     .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
         error => { throw error; }
        )
        .then(response => response.json())
        .then(response => dispatch(addProductToCart(productItem)))
        .then(response => dispatch (
            alert('new cart item: ' + JSON.stringify(productItem._id))
            ))

        .catch(error => {
            console.log('post new cart item', error.message);
            alert('new cart item could not be posted\nError: ' + error.message + productItem);
        })
}

   

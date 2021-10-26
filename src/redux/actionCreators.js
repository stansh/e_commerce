import * as actions from './actions';


 
 export const fetchProducts = () => dispatch => { 
   dispatch(productsLoading());
    return fetch( "/products")
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
    .then(res => dispatch(loadProductsSuccess(res)))
    .catch(error => dispatch(loadingFailed(error)))
    };
  
    
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



// search 
export const search = keywords => ({
    type: actions.SHOW_SEARCH_RESULTS,
    payload: keywords
})





//CART actions

export const cartItemsLoading = () => ({
    type: actions.CART_ITEMS_LOADING
    }); 

export const cartItemsSuccess = data => ({
    type: actions.CART_ITEMS_SUCCESS,
    payload: data
});

export const cartItemsFailed = errMess => ({
    type: actions.CART_ITEMS_FAILDED,
    payload: errMess
});

 export const addProductToCart = productItem  => ({
    type: actions.ADD_PRODUCT_TO_CART,
    payload: productItem
}) 

export const removeProd = id => ({
    type: actions.REMOVE_PRODUCT_FROM_CART,
    payload: id
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

export const fetchCartItems = () => dispatch => { 
    dispatch(cartItemsLoading());
     return fetch('/cart')
     
     .then(response => {
     if (response.ok) { 
         return response;
     } else {
         const error = new Error(`Error ${response.status}: ${response.statusText}`);  
         error.response = response;
         throw error;
     }
     },
         error => { 
             const errMess = new Error(error.message);
             throw errMess;
             }
     )
     .then(res => res.json())
     .then(res => dispatch(cartItemsSuccess(res)))
     .catch(error => dispatch(cartItemsFailed(error)))
     };
 
export const putQtyUp = (id) => dispatch =>  {


    const qty = {
        _id: id,
        operation: "up"
    }
 return fetch ('/cart', {
     method: 'PUT',
     body: JSON.stringify(qty),
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
    .then(response => dispatch(qtyUp(id)))
    .catch(error => {
        
        console.log('quantity didnt update\nError: ' + error.message);
    }) 
}  

export const putQtyDown = (id) => dispatch =>  {
    const qty = {
        _id: id,
        operation: "down"
    }
 return fetch ('/cart', {
     method: 'PUT',
     body: JSON.stringify(qty),
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
    .then(response => dispatch(qtyDown(id)))
    .catch(error => {
        
        console.log('quantity didnt update\nError: ' + error.message);
    })
} 


export const postNewCartItem = (productItem) => dispatch => {
 
   const newCartItem = {
      _id: productItem._id,
      title: productItem.title,
      price: productItem.price.toFixed(2),
      description: productItem.description,
      category: productItem.category,
      image: productItem.image,
      qty: 1
   }

 

   return fetch ('/cart', {
       method: "POST",
       body: JSON.stringify(newCartItem),
       headers: {
        "Content-Type": "application/json" 
        }
     })
     .then(response => {
            if (response.ok) {
                console.log(response)
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
    .catch(error => {
        console.log('new cart item could not be posted\nError: ' + error) ;     
    })   
}
   
export const removeProductFromCart = (id) => dispatch => {
  

    const idToDelete = { _id: id }
 
    return fetch ('/cart', {
        method: "DELETE",
        body: JSON.stringify(idToDelete),
        headers: {
         "Content-Type": "application/json" 
         }
      })
      .then(response => {
             if (response.ok) {
                 console.log(response)
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
     .then(response => dispatch(removeProd(id)))    
     .catch(error => {
        console.log(' cart item could not be deleted\nError: ' + error.message ) ;
        
     })
     
 }
    
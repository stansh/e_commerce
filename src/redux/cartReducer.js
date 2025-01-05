import * as actions from "./actions";
export const cartReducer = ( state = {
    cartItems: [], 
    }, action) => { 
    switch(action.type) {
        case actions.CART_ITEMS_LOADING:
            return {...state, isLoading: true, errMess: null, cartItems:[]};
        case actions.CART_ITEMS_SUCCESS:
            console.log(state.cartItems)
            const correctedPrice_cart = action.payload.map(prod => Object.defineProperty(prod,"price",{value:prod.price / 100}))
            return {...state, isLoading: false, errMess: null, cartItems: correctedPrice_cart };
          // return {...state, isLoading: false, errMess: null, cartItems: state.cartItems.concat(correctedPrice_cart)};
           
        case actions.CART_ITEMS_FAILDED:
            return {...state, isLoading: false, errMess: action.payload};
        case actions.ADD_PRODUCT_TO_CART:
        const hasTheItem  = state.cartItems.some((item) => item._id === action.payload.productItem._id);
            if(!hasTheItem)  { 
                action.payload.productItem.qty = 1;
                action.payload.productItem.userId = action.payload.userId;
                return {...state, 
                    cartItems: state.cartItems.concat(action.payload.productItem),
                    };
            } else {
                    return {...state, 
                        cartItems: state.cartItems.map(item => {
                            if (item.id === action.payload.productItem._id) {
                                item.qty++
                            }
                            return item
                        })}
            } 
        case actions.REMOVE_PRODUCT_FROM_CART:
            if (action.payload == null){
                return {...state, cartItems: []}
            } else {
                const updatedCart = state.cartItems.filter(item => item._id !== action.payload)
                return {...state, cartItems: updatedCart};
            }
            
        case actions.CART_QTY_UP:
            return {...state, 
                cartItems: state.cartItems.map(item => {
                    if (item._id === action.payload) {
                        item.qty++
                    }
                    return item
                })
                    
            }    

        case actions.CART_QTY_DOWN:
            const targetItem = state.cartItems.find(item => item._id === action.payload);
            if (targetItem.qty >= 2) {
                return {...state, 
                    cartItems: state.cartItems.map(item => {
                        if (item._id === action.payload) {
                            item.qty--
                        }
                        return item
                    })       
                } 

            } else {
                const updatedCart = state.cartItems.filter(item => item._id !== action.payload)
                 return {...state, cartItems: updatedCart}
            }
            

        default:
            return state;
    } 

}
import * as actions from "./actions"

export const cartReducer = ( state = {
    cartItems: [], 
    }, action) => { 
    switch(action.type) {
        case actions.ADD_PRODUCT_TO_CART:
        const hasTheItem  = state.cartItems.some((item) => item._id === action.payload._id);
            if(!hasTheItem)  { 
                action.payload.qty = 1
                return {...state, 
                    cartItems: state.cartItems.concat(action.payload),
                    };
            } else {
                    return {...state, 
                        cartItems: state.cartItems.map(item => {
                            if (item.id === action.payload._id) {
                                item.qty++
                            }
                            return item
                        })}
            } 
        case actions.REMOVE_PRODUCT_FROM_CART:
            const updatedCart = state.cartItems.filter(item => item._id !== action.payload)
            return {...state, cartItems: updatedCart};

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
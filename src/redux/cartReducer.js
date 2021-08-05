import * as actions from "./actions"

export const cartReducer = ( state = {
    cartItems: [], 
    }, action) => { 
    switch(action.type) {
        case actions.ADD_PRODUCT_TO_CART:
        const hasTheItem  = state.cartItems.some((item) => item.id === action.payload.id);
            if(!hasTheItem)  { 
                action.payload.qty = 1
                return {...state, 
                    cartItems: state.cartItems.concat(action.payload),
                    };
            } else {

                /* const newData = state.cartItems.filter((item) => item.id !== action.payload.id)
                action.payload.qty++
                return {...state, 
                    cartItems: newData.concat(action.payload)
                    }; */
                    return {...state, 
                        cartItems: state.cartItems.map(item => {
                            if (item.id === action.payload.id) {
                                item.qty++
                            }
                            return item
                        })}
            } 
        case actions.REMOVE_PRODUCT_FROM_CART:
            const updatedCart = state.cartItems.filter(item => item.id !== action.payload.id)
            return {...state, cartItems: updatedCart};

        case actions.CART_QTY_UP:
            return {...state, 
                cartItems: state.cartItems.map(item => {
                    if (item.id === action.payload) {
                        item.qty++
                    }
                    return item
                })
                    
            }    

        case actions.CART_QTY_DOWN:
            //add wht happens when qty is 0
            return {...state, 
                cartItems: state.cartItems.map(item => {
                    if (item.id === action.payload) {
                        item.qty--
                    }
                    return item
                })
                    
            } 

        default:
            return state;
    } 

}
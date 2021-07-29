import * as actions from "./actions"

export const cartReducer = ( state = {
    cartItems: [], 
    }, action) => { 
    switch(action.type) {
        case actions.ADD_PRODUCT_TO_CART:
        const hasTheItem  = state.cartItems.some((item) => item.id === action.payload.id);
        console.log(hasTheItem)
        if(!hasTheItem)  { 
            action.payload.qty = 1
            return {...state, 
                   cartItems: state.cartItems.concat(action.payload),
                };
        } else {

            const newData = state.cartItems.filter((item) => item.id !== action.payload.id)
            action.payload.qty++
            return {...state, 
                cartItems: newData.concat(action.payload)
                   };
        } 
        case actions.REMOVE_PRODUCT_FROM_CART:
            const updatedCart = state.cartItems.filter(item => item.id !== action.payload.id)
            return {...state, cartItems: updatedCart};
        default:
            return state;
    } 

}
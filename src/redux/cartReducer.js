import * as actions from "./actions"

export const cartReducer = ( state = {
    
    cartItems:[]
}, action) => {
    switch(action.type) {
        case actions.ADD_PRODUCT_TO_CART:
            return { ...state, cartItems: state.cartItems.concat(action.payload)};
        case actions.REMOVE_PRODUCT_FROM_CART:
            const updatedCart = state.cartItems.filter(item => item.id !== action.payload.id)
            return  {...state,  cartItems: updatedCart};
        default:
            return state


    }

}
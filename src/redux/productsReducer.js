import * as actions from "./actions"

export const productsReducer = (state = {
    
    isLoading: true,
    errMess: null,
    products: []
}, action) => {
    
    switch (action.type) {
        case actions.PRODUCTS_LOADING:
            return {...state, isLoading: true, errMess: null, products:[]};
        case actions.LOAD_PRODUCTS_SUCCESS:
            return {...state, isLoading: false, errMess: null, products: action.payload};
        case actions.LOADING_FAILDED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};
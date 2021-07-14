import * as actions from "./actions"

export const products =(state = {
    isLoading: true,
    errMess: null,
    products: []
},action) => {
    switch (action.type) {
        case actions.LOAD_PRODUCTS:
            return {...state, isLoading:false, errMess:null, products: action.payload};
        case actions.LOADING_FAILDED:
            return {...state, isLoading:false, errMess:action.payload};
        default:
            return state;
    }
};
import * as actions from "./actions"
//import { productsData } from "../shared/productsData";

export const productsReducer = (state = {
    products: []
}, action) => {
    
    switch (action.type) {
        case actions.PRODUCTS_LOADING:
            return {...state, isLoading: true, errMess: null, products:[]};
        case actions.LOAD_PRODUCTS_SUCCESS:
            const correctedPrice = action.payload.map(prod => Object.defineProperty(prod,"price",{value:prod.price / 100}))
            console.log(correctedPrice)
            return {...state, isLoading: false, errMess: null, products: correctedPrice};
        case actions.LOADING_FAILDED:
            return {...state, isLoading: false, errMess: action.payload};
        case actions.SHOW_SEARCH_RESULTS:
            console.log(state.products)
        let resultProducts =  state.products.filter(item => {
            return item.title.toLowerCase().includes(action.payload.toLowerCase()) || item.description.toLowerCase().includes(action.payload.toLowerCase())                        
            })
            if (state.products.length === resultProducts.length) {
                resultProducts = null
            }
        
            return {...state, isLoading: false, errMess: null, searchResults: resultProducts, products: state.products}
        default:
            return state;
    }
};
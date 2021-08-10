import * as actions from "./actions"
//import { productsData } from "../shared/productsData";

export const productsReducer = (state = {
    products: []
}, action) => {
    
    switch (action.type) {
        case actions.PRODUCTS_LOADING:
            return {...state, isLoading: true, errMess: null, products:[]};
        case actions.LOAD_PRODUCTS_SUCCESS:
            return {...state, isLoading: false, errMess: null, products: action.payload};
        case actions.LOADING_FAILDED:
            return {...state, isLoading: false, errMess: action.payload};
        case actions.SHOW_SEARCH_RESULTS:
            //const keywords = action.payload.split(' ');
            //console.log(keywords)
           //let resultProducts = [];
           const resultProducts =  state.products.filter(item => {
                   return item.title.toLowerCase().includes(action.payload.toLowerCase()) || item.description.toLowerCase().includes(action.payload.toLowerCase())   
                })         
            console.log(resultProducts)
           //state.searchResults = [];
            return {...state, isLoading: false, errMess: null, searchResults: resultProducts}
        default:
            return state;
    }
};
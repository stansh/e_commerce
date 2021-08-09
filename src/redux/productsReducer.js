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
            const keywords = action.payload.split(' ');
            console.log(keywords)
            let resultProducts = [];
            state.products.forEach(item => {
                for (let i = 0; keywords.length; i++ ) {
                    console.log(item.title)
                    if (item.title.toLowerCase().includes(keywords[i].toLowerCase())) {
                        resultProducts.concat(item)
                    }    
                }
                    //item.title.toLowerCase().includes(word.toLowerCase()) ?  resultProducts.concat(item) : null
                })
                   // item.title.toLowerCase().includes(word.toLowerCase()))    
          
            console.log(resultProducts)
           //state.searchResults = [];
            return {...state, isLoading: false, errMess: null, searchResults: resultProducts}
        default:
            return state;
    }
};
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
            // console.log(action.payload)
            // console.log(correctedPrice)
            return {...state, isLoading: false, errMess: null, products: correctedPrice};
        case actions.LOADING_FAILDED:
            return {...state, isLoading: false, errMess: action.payload};
        case actions.SHOW_SEARCH_RESULTS:
            switch(action.payload) {
                case "women":
                    let resultWomen = state.products.filter(item => item.category === "women's clothing");
                    return {...state, isLoading: false, errMess: null, searchResults: resultWomen, products: state.products};

                case "men":
                    let resultMen = state.products.filter(item => item.category === "men's clothing");
                    return {...state, isLoading: false, errMess: null, searchResults: resultMen, products: state.products};

                case "jewelery":
                    let resultJewelry = state.products.filter(item => item.category === action.payload);
                    return {...state, isLoading: false, errMess: null, searchResults: resultJewelry, products: state.products}

                case "electronics":
                    let resultElectronics= state.products.filter(item => item.category === action.payload);
                    return {...state, isLoading: false, errMess: null, searchResults: resultElectronics, products: state.products}
                        
                default:                 
                    let resultProducts =  state.products.filter(item => {
                    return item.title.toLowerCase().includes(action.payload.toLowerCase()) || item.description.toLowerCase().includes(action.payload.toLowerCase())                        
                    })
                    if (state.products.length === resultProducts.length) {
                        resultProducts = null
                    }
                    return {...state, isLoading: false, errMess: null, searchResults: resultProducts, products: state.products}
            } 
        default:
            return state;
    }
};
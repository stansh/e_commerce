
import React, { useEffect } from "react";
import { Card, Spinner, Button, Badge } from 'reactstrap';
import Search from './Search';
import Image from './Image';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts,fetchCartItems,postNewCartItem} from '../redux/actionCreators'






const mapStateToProps = state => { 
  return {
      products: state.productsReducer.products,
      searchResults: state.productsReducer.searchResults,
      loading: state.productsReducer.isLoading
  };
};
    
const mapDispatchToProps =  {
  fetchProducts: () => fetchProducts(),
  postNewCartItem: (item) => postNewCartItem(item),
  fetchCartItems: (item) => fetchCartItems(item),

}


function AllProducts (props) {
  
   useEffect(() => {
    props.fetchProducts();
    props.fetchCartItems();

  },[]); 

  
  if (props.searchResults) {
    return (
      <>
      <Image />
      <div className = 'container'>
        <div className ='row justify-content-center'>
        
        <Search  />
        {props.searchResults.map((product, index) => (  
          <Card id ='prodCard' className ='col-sm-3 mx-2 mb-4' key ={index}>
            <Link to = {`/products/${product._id}`}>
              <h5>{product.title}</h5>
              <h4 className="fw-bolder">${product.price}</h4>
              <img src={product.image} alt={product.title} width = '100px' /> 
              <p className = 'mt-auto'>{product.description}</p>
            </Link>
            <Button id = 'buttons' className = 'mt-auto' onClick = {() => props.postNewCartItem(product)}>Add to Cart</Button> 

          </Card> 
        ))}
        </div>
      </div>  
      </>
    
    )
  } else {
    if (props.loading) {
      return (
        <div>
          <Spinner color="dark" width = '500' className= "mt-5" children = "" />
        </div>
      )
    }
    return (
      <>
      <Image />
      <div className = 'container'>
        <div className ='row justify-content-center'>
        
        <Search  />
        {props.products.map((product, index) => (  
          <Card id ='prodCard' className ='col-sm-2 mx-2 mb-4' key ={index}>
            <Link to = {`/products/${product._id}`}>
              <h5>{product.title}</h5>
              <h4 className="fw-bolder">${product.price}</h4>
              <img src={product.image} alt={product.title} width = '100px' />
              <p className = 'my-auto'>{product.description}</p>
            </Link>
            <Button  id = 'buttons' className = 'mt-auto' onClick = {() => props.postNewCartItem(product)}>Add to Cart</Button> 
          </Card> 
        ))}
        </div>
      </div>  
      </>
    )
  }
}

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));

 
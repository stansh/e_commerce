
import React,{useState,useEffect, useFetching}from "react";
import {
    Card, Jumbotron, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import Cart from "./Cart";
import Search from './Search';
import Image from './Image';

import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts,fetchCartItems, loadProductsSuccess, loadProductsData, addItem, addProductToCart,postNewCartItem} from '../redux/actionCreators'




//receives entire state tree and returns an object that contains only the data needed by the component

const mapStateToProps = state => { 
  return {
      products: state.productsReducer.products,
      searchResults: state.productsReducer.searchResults
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
              <h4>{product.title}</h4>
              <h3>${product.price}</h3>
              <img src={product.image} alt={product.title} width = '100px' /> 
              <p className = 'mt-auto'>{product.description}</p>
            </Link>
            <Button id = 'addProdBtn' className = 'btn mt-auto' onClick = {() => props.postNewCartItem(product)}>Add to Cart</Button> 

          </Card> 
        ))}
        </div>
      </div>  
      </>
    
    )
  } else {
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
                <h3>${product.price}</h3>
                <img src={product.image} alt={product.title} width = '100px' />
                <p className = 'mt-auto'>{product.description}</p>
              </Link>
              <Button  id = 'addProdBtn' className = 'btn mt-auto' onClick = {() => props.postNewCartItem(product)}>Add to Cart</Button> 
            </Card> 
          ))}
          </div>
        </div>  
        </>
      )
    }
  }

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));

 /*  <div className = 'container'>
        <div className ='row justify-content-center'>
        <Cart />
        <Search />
        {props.searchResults.map((product, index) => (  
          <Card className ='col-md-3 mx-2' key ={index}>
            <Link to = {`/products/${product._id}`}>
              <h3>{product.title}</h3>
              <h3>${product.price}</h3>
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.title} width = '100px' />
            </Link>
            <p>{product.description}</p>
          <Button onClick = {() => props.postNewCartItem(product)} >Add to Card</Button> 
          </Card> 
        ))}
        </div>
      </div> */
      


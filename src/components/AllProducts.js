
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
import { fetchProducts, loadProductsSuccess, loadProductsData, addItem, addProductToCart,postNewCartItem} from '../redux/actionCreators'




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
}


function AllProducts (props) {
  
   useEffect(() => {
    props.fetchProducts();

  },[]); 

  
  if (props.searchResults) {
    return (
      <div className = 'container'>
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
      </div>
      

    )
  } else {
      return (
        <>
        <Image />
        <div className = 'container'>
          <div className ='row justify-content-center'>
          <Cart />
          <Search  />
          {props.products.map((product, index) => (  
            <Card className ='prodCard col-sm-3 mx-1' key ={index}>
              <Link to = {`/products/${product._id}`}>
                <h4>{product.title}</h4>
                <h3>${product.price}</h3>
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.title} width = '100px' /> 
              </Link>
              <p className = 'mt-auto'>{product.description}</p>
              <Button className = 'btn mt-auto' onClick = {() => props.postNewCartItem(product)}>Add to Card</Button> 
            </Card> 
          ))}
          </div>
        </div>  
        </>
      )
    }
  }

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));

//export default withRouter(AllProducts);
    
/* function AllProducts() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setItems] = useState([]); */
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
  /*   useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        
            <div className ='row justify-content-center'>
          {products.map(product => (  
            
            <Card className ='col-md-3 mx-2' key ={product.id}>
            <Link to = {`/${product.id}`}>
           
                <h3>{product.title}</h3>
                <h3>{product.price}</h3>
                <img src={product.image} alt={product.title} width = '50%' />
                <p>{product.description}</p>  
                
                </Link>
            </Card> 
          ))}
          </div>
          
      
      );
    }
  } */


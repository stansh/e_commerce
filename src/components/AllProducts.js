
import React,{useState,useEffect, useFetching}from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import Cart from "./Cart";
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts, loadProductsData, addItem} from '../redux/actionCreators'




//receives entire state tree and returns an object that contains only the data needed by the component

const mapStateToProps = state => { 
  return {
      products: state.productsReducer.products
  };
};
    
const mapDispatchToProps =  {
  //fetchProducts: () => (fetchProducts()),
  loadProductsData: () => (loadProductsData()),
  addItem: (item) => (addItem(item))
}

function AllProducts (props) {
 useEffect(() => {
 
  //props.fetchProducts();
  props.loadProductsData();
  
},[]); 
 



  return (
        
    <div className ='row justify-content-center'>
      <Cart />
      {props.products.map((product, index) => (  
        <Card className ='col-md-3 mx-2' key ={index}>
          <Link to = {`/${index}`}>
            <h3>{product.title}</h3>
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.title} width = '100px' />
            <p>{product.description}</p>
            
        </Link>
        <Button onClick = {() => props.addItem(product)} >Add to Card</Button> 
        </Card> 
      ))}
    </div>
)}

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


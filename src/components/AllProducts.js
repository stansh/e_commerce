
import React,{useState,useEffect, useFetching}from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import {Link,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchProducts} from '../redux/actionCreators'






const mapStateToProps = state => { //receives entire state tree and returns an object that contains only the data needed by the component
  return {
      products: state.products
  };
};
    
const mapDispatchToProps =  {
  fetchProducts: () => (fetchProducts())
}

function AllProducts (props) {
/* useEffect(() => {
  props.fetchProducts();
},[]); */
  
 
  return (
        
    <div className ='row justify-content-center'>
      {props.products.map(product => (  
        <Card className ='col-md-3 mx-2' key ={product.id}>
          <Link to = {`/${product.id}`}>
            <h3>{product.title}</h3>
            <h3>{product.price}</h3>
            <img src={product.image} alt={product.title} width = '50%' />
            <p>{product.description}</p>
            {/* <Button onClick = {addToCard()} >Add to Card</Button>  */} 
        </Link>
        </Card> 
      ))}
    </div>
)}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AllProducts));
    
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


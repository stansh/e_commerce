
import React,{useState,useEffect}from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import {Link} from 'react-router-dom';


const url = 'https://fakestoreapi.com/products';



function AllProducts() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setItems] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
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
  }





/* function AllProducts () {
    fetch(url)
    .then(res => res.json())
    .then(res => {   
        const products = res.map(product => {
            return (
                <div key ={product.id}>
                    <h3>{product.title}</h3>
                    <h3>{product.price}</h3>
                    <p>{product.description}</p>
                </div>
            );

        });
        return  {products}  
   

            
    });
         
        
} */

export default AllProducts;
    


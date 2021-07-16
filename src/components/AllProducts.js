
import React,{useState,useEffect}from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import {Link,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchProducts} from '../redux/actionCreators'




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

  /* function AllProducts (props) {
    const [products,setProducts] = useState()
    useEffect (()=> {


    }) */
    const mapStateToProps = state => { //receives entire state tree and returns an object that contains only the data needed by the component
      return {
          products: state.products
      };
  };
    
     const mapDispatchToProps =  {
        
        fetchProducts: () => (fetchProducts())
     }

      class AllProducts extends React.Component {
      componentDidMount() {
        this.props.fetchProducts();
      }  

      /* function AllProducts () {
      useEffect (() => fetchProducts());  */
  
  render() {
       /* const { error, loading, products } = this.props;
    
         if (error) {
          return <div>Error! {error.message}</div>;
        }
    
        if (loading) {
          return <div>Loading...</div>;
        } */
 
    return (
        
      <div className ='row justify-content-center'>
    {this.props.products.map(product => (  
      
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

    )}

  }





export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AllProducts));
    


import React, { useEffect } from "react";
import { Card, Spinner, Button } from 'reactstrap';
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
      <div className = 'container-flow'>
        <div className ='row justify-content-center'>
        
        <Search  />
        {props.searchResults.map((product, index) => (  
          <Card id ='prodCard' className ='col-sm-3 mx-2 mb-4' key ={index}>
				<Link to = {`/products/${product._id}`}>
					<div className="row just mx-2 mx-md-1 my-3">
						<div className="col-md-6 d-flex d-md-inline-block justify-content-center justify-content-md-left mb-3">
							<img src={product.image} alt={product.title}  className="w-75 w-md-100"/> 
						</div>
						<div className="col-md-6 ">
							<h5>{product.title}</h5>
							<h4 className="fw-bolder">${product.price}</h4>
							<p className = 'mt-auto'>{product.description}</p>	 
						</div>
					</div>			
				</Link>
				<Button id = 'buttons' className = 'mt-auto mx-2' onClick = {() => props.postNewCartItem(product)}>Add to Cart</Button> 
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
      <div className = 'container-flow'>
        <div className ='row justify-content-center'>
        
        <Search  />
        {props.products.map((product, index) => (  
          <Card id ='prodCard' className ='col-sm-2 mx-2 mb-4' key ={index}>
			
            <Link to = {`/products/${product._id}`}>
				<div className="row just mx-2 mx-md-1 my-3">
					<div className="col-md-6 d-flex d-md-inline-block justify-content-center justify-content-md-left mb-3">
						<img src={product.image} alt={product.title} className="w-75 w-md-100"/>
					</div>
					<div className="col-md-6">
						<h5>{product.title}</h5>
						<h4 className="fw-bolder">${product.price}</h4>
						<p className = 'my-auto'>{product.description}</p>
					</div>
				</div>
            </Link>
            <Button  id = 'buttons' className = 'mt-auto mx-2' onClick = {() => props.postNewCartItem(product)}>Add to Cart</Button> 
			
          </Card> 
        ))}
        </div>
      </div>  
      </>
    )
  }
}

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));

 
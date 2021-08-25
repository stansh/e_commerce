import React,{useState,useEffect}from "react";
import  {Route, useParams, Link} from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => { 
    return {
        products: state.productsReducer.products
    };
  };


function Product (props) {
    const {id} = useParams();
 
    const theProduct = props.products.find(prod => prod._id === id)
    
    return (
        <div className = 'container mt-5 ' >
            < h1>{theProduct.title}</h1>
            <h2>${theProduct.price}</h2>
            <img src={theProduct.image} alt={theProduct.name} width = '200px' />
            <p>{theProduct.description}</p>  
            <Link className ='btn btn-success' to="/products">All Products</Link>
        </div> 
    )

}

export default withRouter(connect(mapStateToProps)(Product));
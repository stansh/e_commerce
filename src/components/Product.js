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
    const {index} = useParams();
    return (
        <div className = 'container mt-5 ' >
            <h1>{props.products[index].title}</h1>
            <h2>${props.products[index].price}</h2>
            <img src={props.products[index].image} alt={props.products[index].name} width = '200px' />
            <p>{props.products[index].description}</p> 
            <Link className ='btn btn-success' to="/all">All Products</Link>
        </div> 
    )

}

export default withRouter(connect(mapStateToProps)(Product));
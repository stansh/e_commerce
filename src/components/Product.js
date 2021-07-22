import React,{useState,useEffect}from "react";
import  {Route, useParams, Link} from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => { 
    return {
        products: state.products
    };
  };


function Product (props) {
    const {handle} = useParams();
    return (
        <div className = 'container mt-5 '>
            <h1>{props.products[handle - 1].title}</h1>
            <h2>{props.products[handle - 1].price}</h2>
            <img src={props.products[handle - 1].image} alt={props.products[handle - 1].title} width = '20%' />
            <p>{props.products[handle - 1].description}</p> 
            <Link className ='btn btn-success' to="/all">All Products</Link>
        </div> 
    )

}

export default withRouter(connect(mapStateToProps)(Product));
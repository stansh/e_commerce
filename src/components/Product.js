import React,{useState,useEffect}from "react";
import  {Route, useParams, Link} from 'react-router-dom';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';


function Product ({product}) {
    
    const {handle} = useParams();
    return (
        //<Route path={`/${product.id}`}>
       
            <div className = 'container'>
                
                {/*   <h1>{product.title}</h1>
                <h2>{product.price}"</h2>
                <p>{product.description}</p>  */}

                 <h2>Handle: {handle}</h2>  
                 
            </div>
       
    )

}

 export default Product;
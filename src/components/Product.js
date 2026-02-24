import React from "react";
import  {useParams, Link} from 'react-router-dom';

import { withRouter } from 'react-router-dom';
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
        <div className = 'container mt-5'>
            <div className="row align-items-start">
                <div className="col-md-5 text-center">
                    <img
                        src={"/" + theProduct.image}
                        alt={theProduct.name}
                        className="img-fluid px-2"

                    />
                </div>
                <div className="col-md-7 px-md-4 mt-2 text-start">
                    <h3>{theProduct.title}</h3>
                    <h2 style={{fontWeight:"700"}}>${theProduct.price}.99</h2>

                    <p>{theProduct.description}</p>  
                    <Link className ='btn btn-success' to="/products">All Products</Link>
                </div>
            </div>
        </div> 
    )

}

export default withRouter(connect(mapStateToProps)(Product));
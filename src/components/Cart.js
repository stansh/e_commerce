import React from 'react';
import {Card, Button} from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        cart: state.cartReducer.cartItems
    };
};

const mapDispatchToProps = {


}

function Cart (props) {

  if (props.cart.length === 0) {

    return (
        <div >
            <h1>No Items</h1>
            <h3>{props.cart.length}</h3>
        </div>
    )
   
    } else {
    return (
    <div>
        <Card>
            <h2>My cart</h2>
             {props.cart.map((product,index) => (
                <div key = {index} >
                    <h5>{product.title}</h5>
                    <h5>{product.price}</h5>
                    <Button className = 'btn btn-sm btn-info' onClick = {() => props.removeItem(product)} >Remove Item</Button> 
                </div>
            ))} 
        </Card>
    </div>

    )
}
}

export default withRouter(connect(mapStateToProps)(Cart));
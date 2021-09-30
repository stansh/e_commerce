import React, {useState} from 'react';
import {Card, Button} from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeProductFromCart, putQtyDown,putQtyUp} from '../redux/actionCreators';

const mapStateToProps = state => {
    return {
        cart: state.cartReducer.cartItems
    };
};
const mapDispatchToProps = {
    removeProductFromCart: (id) => removeProductFromCart(id),
    putQtyUp: (id) => putQtyUp(id),
    putQtyDown: (id) => putQtyDown(id),
   
}

function Cart (props) {
 

  if (!props.cart) {

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
                <div key = {index} className='col-4-md'>
                    <h5>{product.title}</h5>
                    <h5>{product.price}</h5>
                    <h5>Quantity: <span><Button onClick = {() => props.putQtyDown(product._id)}>-</Button> {product.qty} <Button onClick = {() => props.putQtyUp(product._id)}>+</Button></span></h5>
                    <Button className = 'btn btn-sm btn-info' onClick = {() => props.removeProductFromCart(product._id)} >Remove Item</Button> 
                </div>
            ))} 
        </Card>
    </div>

    )
}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Cart));
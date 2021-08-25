import React, {useState} from 'react';
import {Card, Button} from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeProductFromCart,qtyUp, qtyDown} from '../redux/actionCreators';

const mapStateToProps = state => {
    return {
        cart: state.cartReducer.cartItems
    };
};
const mapDispatchToProps = {
    removeProductFromCart: (item) => removeProductFromCart(item),
   qtyUp: (id) => qtyUp(id),
   qtyDown: (id) => qtyDown(id)
}

function Cart (props) {
 console.log(props)

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
                    <h5>Quantity: <span><Button onClick = {() => props.qtyDown(product._id)}>-</Button> {product.qty} <Button onClick = {() => props.qtyUp(product._id)}>+</Button></span></h5>
                    <Button className = 'btn btn-sm btn-info' onClick = {() => props.removeProductFromCart(product)} >Remove Item</Button> 
                </div>
            ))} 
        </Card>
    </div>

    )
}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Cart));
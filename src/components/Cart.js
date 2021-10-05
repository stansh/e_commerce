import React, { useEffect  }from "react";
import {Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Table} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeProductFromCart, putQtyDown,putQtyUp,fetchCartItems} from '../redux/actionCreators';

const mapStateToProps = state => {
    return {
        cart: state.cartReducer.cartItems
    };
};
const mapDispatchToProps = {
    removeProductFromCart: (id) => removeProductFromCart(id),
    putQtyUp: (id) => putQtyUp(id),
    putQtyDown: (id) => putQtyDown(id),
    fetchCartItems: () =>  fetchCartItems()
   
}



function Cart (props) {
    useEffect(() => {
        props.fetchCartItems();
    
      },[]); 
 

  if (!props.cart) {

    return (
        <div >
            <h1>No Items</h1>
            <h3>{props.cart.length}</h3>
            <Link className ='btn' to="/products">Continue Shopping</Link>
        </div>
    )
   
    } else {
    return (
    <div className = 'container-lg'>
        <div className = 'row'>
            <div className = 'col-md-9'>
            <Table striped className = 'mt-3 text-right'>
                <thead>
                    <tr >
                    <th className= 'col-md-2 text-uppercase'>Name</th>
                    <th className= 'col-md-2 text-uppercase small'>Description</th>
                    <th className= 'col-md-2 text-uppercase'>Qty</th>
                    <th className= 'col-md-2 text-uppercase'>Price</th>
                    </tr>
                </thead>
                <tbody>
                {props.cart.map((product,index) => (
                    <tr key = {index} >
                        <th >{product.title}</th>
                        <td>{product.description}</td>
                        <td><Button onClick = {() => props.putQtyDown(product._id)}>-</Button> {product.qty} <Button onClick = {() => props.putQtyUp(product._id)}>+</Button></td>
                        <td>${product.price * product.qty}</td>
                    </tr>  
                ))} 
                </tbody>
            </Table>

            </div>
            
            <Card className = 'col-md-3 mt-3 ' id = 'orderInfo'>
                <h4>Your Order</h4>
                 const total

                <Button>Place Order</Button>

            </Card>

        </div>
        

        <Link className ='btn' to="/products">Continue Shopping</Link>
    </div>

    )
}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Cart));

  

                    {/* <h5>{product.title}</h5>
                    <h5>{product.description}</h5>
                    <h5>{product.price}</h5>
                    <h5>Quantity: <span><Button onClick = {() => props.putQtyDown(product._id)}>-</Button> {product.qty} <Button onClick = {() => props.putQtyUp(product._id)}>+</Button></span></h5>
                    <Button className = 'btn btn-sm btn-info' onClick = {() => props.removeProductFromCart(product._id)} >Remove Item</Button>  */}
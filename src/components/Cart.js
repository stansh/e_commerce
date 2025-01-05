import React, { useEffect, useState  }from "react";
import { Alert, Button, Table} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeProductFromCart, putQtyDown,putQtyUp,fetchCartItems, cartItemsSuccess} from '../redux/actionCreators';
import StripeCheckout from "react-stripe-checkout";
import { useAuth0 } from '@auth0/auth0-react';


const mapStateToProps = state => {
    return {
        cart: state.cartReducer.cartItems
    };
};

const mapDispatchToProps = {
    removeProductFromCart: (id) => removeProductFromCart(id),
    putQtyUp: (id) => putQtyUp(id),
    putQtyDown: (id) => putQtyDown(id),
    fetchCartItems: (userId) =>  fetchCartItems(userId),
    cartItemsSuccess: () => cartItemsSuccess()
}


function Cart (props) {
    const [success, setSuccess] = useState(false); 
    const { user, isLoading, isAuthenticated } = useAuth0();
    const userId = isAuthenticated ? user.sub : "";
    let total = 0;
    useEffect(() => {
        if(isAuthenticated){
            props.fetchCartItems(userId);
        }
    },[isAuthenticated, isLoading]); 
    
    if (props.cart.length !== 0) {
        props.cart.forEach(item => {
            total = total + (item.price * item.qty)
            
        });
    }

    async function handleToken(token) {
        const productList = props.cart.map(item => item.title)
        const paymentData = {
            token: token,
            amount: total.toFixed(2),
            items: productList
        };
        await fetch('/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(paymentData)
            },)
            .then(res => {
                if (res.ok) {
                    alert("Purchase completed. Thank you!")
                    props.removeProductFromCart(null)
                    setSuccess(true)
                    return res;
                } else {
                    const error = new Error(`Error ${res.status}: ${res.statusText}`);
                    error.res = res;
                    throw error;
                }
            },
            error => { throw error; }
            )
            
            .catch(error => {
                console.log('Error: ' + error.message) ;     
            })  
    }
   
    if (success) {
        return (
            <div >
                <h3 className ='mt-5 mb-5'>Thank you for your purchase!</h3>               
                <Link id ="buttons" className = "m-5 p-2" to="/products">Continue Shopping</Link>
            </div>
        )
          
    } else if ( props.cart.length === 0) {
        return (
            <div >
                <h3 className ='mt-5 mb-5'>No Items</h3>
                <Link id ="buttons" className = "m-5 p-2" to="/products">Continue Shopping</Link>
            </div>
        )
    } else {
        return (
            <div className = 'container-lg'>
                <div className = 'row'>
                    <div className = 'table-responsive col-sm-9'>
                        <Table striped reponsive className = 'table table-responsive mt-3 text-right'>
                            <thead>
                                <tr >
                                <th className= 'col-md-2 text-uppercase'>Title</th>
                                <th className= 'col-md-1 text-uppercase'>Price</th>
                                <th className= 'col-md-3 text-uppercase '>Description</th>
                                <th className= 'col-md-1 text-uppercase'>Qty</th>
                                <th className= 'col-md-1 text-uppercase'>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                            {props.cart.map((product,index) => (
                                <tr key = {index} >
                                    <th >{product.title}</th>
                                    <th >${product.price}</th>
                                    <td className='small'>{product.description}</td>
                                    <td>
                                        <Button className='btn btn-sm' onClick = {() => props.putQtyDown(product._id)}>-</Button> 
                                         <span> {product.qty} </span>
                                        <Button className='btn btn-sm' onClick = {() => props.putQtyUp(product._id)}>+</Button>
                                        <a className='btn btn-sm mt-auto text-decoration-underline text-center' href  onClick = {() => props.removeProductFromCart(product._id)}>Remove</a>

                                    </td>
                                    <td>${product.price * product.qty}</td>
                                </tr>  
                            ))} 
                            </tbody>
                        </Table>
                    </div>
                    {!isLoading && !user && (
                        <div className= 'col-md-3 mt-3' id = "orderTotal" >
                            <h4 className='mt-5'>
                                Please log in to checkout!
                            </h4>

                        </div>
                   

                    )}
                    {!isLoading && user && (
                          <div  className= 'col-md-3 mt-3' id = "orderTotal" >
                          <h5>Your Total </h5>
                          <h2>${total.toFixed(2)}</h2>
                          <StripeCheckout 
                              stripeKey = {process.env.STRIPE_KEY}
                              token = {handleToken}
                              billingAddress
                              shippingAddress
                              amount = {total * 100}
                             
                          />
                      </div>  

                    )}

                                                    
                </div>       
                <Link  to="/products">
                    <Button id ="buttons" className = "mt-3 mb-5">Continue Shopping</Button>
                </Link>
            </div>

        )
    }
}
   
 
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Cart));






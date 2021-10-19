import React, { useEffect, useState  }from "react";
import { Button, Table} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeProductFromCart, putQtyDown,putQtyUp,fetchCartItems} from '../redux/actionCreators';

import StripeCheckout from "react-stripe-checkout";


  


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
    const [success, setSuccess] = useState(false)
    
  
    let total = 0;

    useEffect(() => {
        props.fetchCartItems();   
      },[]); 
   
    if (props.cart.length !== 0) {
        props.cart.forEach(item => {
            total = total + (item.price * item.qty)
            
        });
    }



    async function handleToken(token) {
        let productList = props.cart.map(item => item.title)
        const paymentData = {
            token: token,
            amount: total.toFixed(2),
            items: productList
        };
        await fetch('http://localhost:3000/checkout', {
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
                <h3>Thank you for your purchase!</h3>
                 <ul>
                      {/* {bought.map(item => <li>{item.title}</li>)}  */}
                 </ul>               
                <Link className ='btn btn-secondary' to="/products">Continue Shopping</Link>
            </div>
        )
          
    } else if ( props.cart.length === 0) {
        return (
            <div >
                <h3>No Items</h3>
                <h3>{props.cart.length}</h3>
                <Link className ='btn btn-secondary' to="/products">Continue Shopping</Link>
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
                                <th className= 'col-md-1 text-uppercase'>Price</th>
                                <th className= 'col-md-2 text-uppercase small'>Description</th>
                                <th className= 'col-md-2 text-uppercase'>Qty</th>
                                <th className= 'col-md-2 text-uppercase'>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                            {props.cart.map((product,index) => (
                                <tr key = {index} >
                                    <th >{product.title}</th>
                                    <th >${product.price}</th>
                                    <td>{product.description}</td>
                                    <td><Button onClick = {() => props.putQtyDown(product._id)}>-</Button> {product.qty} <Button onClick = {() => props.putQtyUp(product._id)}>+</Button></td>
                                    <td>${product.price * product.qty}</td>
                                </tr>  
                            ))} 
                            </tbody>
                        </Table>
                    </div>  
                    <div  className= 'card col-md-3'>
                        <h5>Your Order Total </h5>
                        <h2>${total.toFixed(2)}</h2>
                        <StripeCheckout 
                            stripeKey = "pk_test_51JhRBrECGNUUIhhjpx6b8PpifvHuopYIQoWDrcnJpY8uvFFQlenQj1Dxv45LGMLRIH1bfqWOUd27GYqTlVMH7jP60022nrPrgl"
                            token = {handleToken}
                            billingAddress
                            shippingAddress
                            amount = {total * 100}
                        />
                    </div>                                    
                </div>       
                <Link className ='btn btn-secondary' to="/products">Continue Shopping</Link>
            </div>

        )
    }
}
   
 
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Cart));






/* function Cart (props) {
    
    
    useEffect(() => {
        props.fetchCartItems();
      },[]); 

    
    let total = 0;
    props.cart.forEach(item => {
          total = total + (item.price * item.qty)
          Number(total)
    });
    let productList = props.cart.map(item => item.title)
    console.log(productList)

    async function handleToken(token) {
        const paymentData = {
            token: token,
            amount: total

        };
        await fetch('http://localhost:3000/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(paymentData)
            })
        .then(res => {
            if (res.ok) {
                alert("Purchase completed!" {productList})
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
                                <th className= 'col-md-1 text-uppercase'>Price</th>
                                <th className= 'col-md-2 text-uppercase small'>Description</th>
                                <th className= 'col-md-2 text-uppercase'>Qty</th>
                                <th className= 'col-md-2 text-uppercase'>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                            {props.cart.map((product,index) => (
                                <tr key = {index} >
                                    <th >{product.title}</th>
                                    <th >${product.price}</th>
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
                        <h1>${total}</h1>
                        <StripeCheckout
                        stripeKey = 'pk_test_51JhRBrECGNUUIhhjpx6b8PpifvHuopYIQoWDrcnJpY8uvFFQlenQj1Dxv45LGMLRIH1bfqWOUd27GYqTlVMH7jP60022nrPrgl'
                        token = {handleToken}
                        billingAddress
                        shippingAddress
                        amount = {total * 100}
                        />
                         

                    </Card>
                </div>       
                <Link style = {{color:"#242222"}} to="/products">Continue Shopping</Link>
            </div>

    )
}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Cart)); */

  
 /* await fetch('http://localhost:3000/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(paymentData)
        })
        .then(res => {
            if (res.ok) {
                console.log(res)
                alert("Purchase completed!\n" +  {paymentData})
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
 */
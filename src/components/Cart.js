import React, { useEffect  }from "react";
import {Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Table} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeProductFromCart, putQtyDown,putQtyUp,fetchCartItems} from '../redux/actionCreators';
import StripeCheckout from 'react-stripe-checkout'

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

    let total = 0
    props.cart.forEach(item => {
        total = total + (item.price * item.qty )
    })


   
     async function handleToken(token,total) {
      console.log(token)
        const paymentData = {
            token: token,
            amount: total
            //product: props.cart[0].id
        };
      
        // Use fetch to send the token ID and any other payment data to your server.
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        const response = await fetch('http://localhost:3000/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paymentData),
        });
      
        // Return and display the result of the charge.
        console.log(response)
        return response;
      }



     /*    var stripeHandler  = StripeCheckout.configure({
          key: 'k_test_51JhRBrECGNUUIhhjH0ft95P6jY80N538YN7d1xaAn0kkfW0aulfmEBfphaMOZxD6v7USiLeYUPmNfFSkELtVkb7L00y1SboNnB',
          locale: 'auto',
          token: function (token){
              console.log(token)
          }

      })    
  */




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
                        {/* <Button className ='btn'>Place Order</Button> */}
                        <StripeCheckout
                        stripeKey = 'pk_test_51JhRBrECGNUUIhhjpx6b8PpifvHuopYIQoWDrcnJpY8uvFFQlenQj1Dxv45LGMLRIH1bfqWOUd27GYqTlVMH7jP60022nrPrgl'
                        token = {handleToken}
                        billingAddress
                        shippingAddress
                        amount = {total}
                        name = {props.cart}


                        
                        />


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
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
const mapStateToProps = state => {
  return {
      cart: state.cartReducer.cartItems
  };
};



function Submit ({cartItems}) {

  let total = 0;

  cartItems.forEach(item => {
        total = total + (item.price * item.qty)
        Number(total)
  });

 let productList = cartItems.map(item => item.title)
   
 
     
  
       fetch('http://localhost:3001/create-checkout-session', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'              
          },
          body:JSON.stringify( {quantity: "3"})
          })
      .then(res => {
          if (res.ok) {
              //alert("Purchase completed!" {productList})
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
          console.log('Error: ' + error) ;     
      })   
      
    

  return (
    <div  className= 'card col-md-3'>
    <h5>Your Order Total </h5>
    <h2>{total.toFixed(2)}</h2>
    <Button >Proceed to checkout</Button>
    
    </div>
       
  )
    
} 
 
 

  /* const Submit = () => (

  <section>

    <div className="product">

      <img

        src="https://i.imgur.com/EHyR2nP.png"

        alt="The cover of Stubborn Attachments"

      />

      <div className="description">

      <h3>Stubborn Attachments</h3>

      <h5>$20.00</h5>

      </div>

    </div>

    <form action="/create-checkout-session" method="POST">

      <button type="submit">

        Checkout

      </button>

    </form>

  </section>

); 
 */


const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

function OrderInfo(props) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <Submit cartItems = {props.cart}  />
  );
}

export default connect(mapStateToProps,null)(OrderInfo);
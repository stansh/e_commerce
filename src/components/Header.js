import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
      cart: state.cartReducer.cartItems
  };
};


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className ='sticky-top' >
      <Navbar  className ='' expand="lg">
        <div className = 'container'>
        <NavbarBrand href="/"><h2> <snap id = 'mern' >MERN</snap>shop</h2></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <a href="/components/">Men</a>
            </NavItem>
            <NavItem>
              <a href="/components/">Women</a>
            </NavItem>
            <NavItem>
              <a href="/components/">Jewelry</a>
            </NavItem>
            <NavItem>
              <a href="/components/">Electronics</a>
            </NavItem>
           
          </Nav>
          <Link to = {`/cart`} id ='cartIcon' href="/cart">Cart {props.cart.length}</Link>
        </Collapse>

        </div>
        
      </Navbar>
     
    </div>
  );
}

export default connect(mapStateToProps,null)(Header);

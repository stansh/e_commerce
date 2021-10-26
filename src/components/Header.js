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
import { search } from '../redux/actionCreators';


const mapStateToProps = state => {
  return {
      cart: state.cartReducer.cartItems
  };
};


const mapDispatchToProps =  {
  search: (keywords) => (search(keywords))

}

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className ='sticky-top' >
      <Navbar   expand="md">
        <div className = 'container'>
        <NavbarBrand href="/"><h2> <span id = 'mern' >MERN</span>shop</h2></NavbarBrand>
        <NavbarToggler onClick={toggle} id = "toggler" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="" navbar>
            <NavItem className = 'text-start'>
              <button  onClick = {() => props.search("women")} >Women</button>
            </NavItem>
            <NavItem className = 'text-start'>
              <button  onClick = {() => props.search("men")} >Men</button>
            </NavItem>
            <NavItem className = 'text-start'>
              <button  onClick = {() => props.search("jewelery")} >Jewelery</button>
            </NavItem >
            <NavItem className = 'text-start'>
              <button  onClick = {() => props.search("electronics")} >Electronics</button>
            </NavItem>
           
          </Nav>
         
            <Link to = '/cart' id ='cartIcon' href="/cart" className="float-start">
              <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-fill align-middle m-1" viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
              </svg>
              <span className='align-text-top'>{props.cart.length}</span>
            </Link>

       
          
        </Collapse>

        </div>
        
      </Navbar>
     
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);

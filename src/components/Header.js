import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Jumbotron,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button 
} from 'reactstrap';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className ='sticky-top' >
      <Navbar  className ='' expand="lg">
        <div className = 'container'>
        <NavbarBrand href="/">MERN SHOP</NavbarBrand>
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
          <div id ='button' className >Cart</div>
          
        </Collapse>

        </div>
        
      </Navbar>
     
    </div>
  );
}

export default Header;

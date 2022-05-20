import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import { logout } from '../actions/userActions';


const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
       <Navbar bg="dark" variant = "dark" collapseOnSelect expand = "lg">
  <Container>
    <Navbar.Brand href="/">Fashion World</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>

        {userInfo ?(
           <NavDropdown title = {userInfo.name} id = 'username'>
                <Nav.Link to = '/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </Nav.Link>
                <NavDropdown.Item onClick = {logoutHandler}>LogOut</NavDropdown.Item>
           </NavDropdown>  
        ): <Nav.Link href="/login"><i className='fas fa-user'></i>Login</Nav.Link> }
      
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  )
}

export default Header
import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import Searchbox from './Searchfile';
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
    <Navbar.Brand as = {Link} to = "/">Fashion World</Navbar.Brand>


    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">

    {/* <Route render={(history) => <Searchbox history={history} />} />
            <Nav
              className='mr-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href='#action1' disabled></Nav.Link>
              <Nav.Link href='#action2' disabled></Nav.Link>
              <Nav.Link href='#' disabled></Nav.Link>
            </Nav> */}
      <Nav className="ml-auto">
        <Nav.Link as = {Link} to="/cart"><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>

        {userInfo ?(
           <NavDropdown title = {userInfo.name} id = 'username'>
                <Nav.Link as = {Link} to = '/profile'>
                  <NavDropdown.Item >Profile</NavDropdown.Item>
                </Nav.Link>
                <NavDropdown.Item onClick = {logoutHandler}>LogOut</NavDropdown.Item>
           </NavDropdown>  
        ): <Nav.Link as = {Link}  to="/login"><i className='fas fa-user'></i>Login</Nav.Link> }
      
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  )
}

export default Header
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
// import { useParams } from 'react-router-dom'
import { logout } from '../actions/user/userActions';

const Header = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Pro Shop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to='/cart'>
                <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link><i className="fas fa-user"></i> Sign in</Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='admin'>
                  <LinkContainer to='/admin/users-list'>
                    <NavDropdown.Item>Users List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/products-list'>
                    <NavDropdown.Item>Products List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orders-list'>
                    <NavDropdown.Item>Orders List</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header

import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import "../style.css";

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header
      style={{
        backgroundColor: '#003b68',
      }}
    >
      <Navbar bg='purple' variant='dark' expand='lg'>
        <Container>
          <Nav className='mr-auto'>
            <LinkContainer to='/'>
              <Navbar.Brand>
                <img
                  src='/logo.png'
                  width='30'
                  height='30'
                  className='d-inline-block align-top'
                  alt='LOGO'
                />
                <span style={{ fontSize: '1.5rem', marginLeft: '1rem' }}>
                  IIITL Exam
                </span>
              </Navbar.Brand>
            </LinkContainer>
          </Nav>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <LinkContainer to='/'>
                <Nav.Link>
                  <i className='fa fa-home fa-lg'></i>
                  <span style={{ fontSize: '1rem', paddingLeft: '5px', paddingRight: '10px'}}>Home</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer className='nav-link' to='/exams'>
                <Nav.Link>
                  <i className='fa fa-list fa-lg'></i>
                  <span style={{ fontSize: '1rem', paddingLeft: '5px', paddingRight: '10px' }}>Exams</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/about'>
                <Nav.Link>
                  <i className='fa fa-info fa-lg'></i>
                  <span style={{ fontSize: '1rem', paddingLeft: '5px' }}>About us</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className='ml-auto' style={{ fontSize: '1rem' }}>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <span style={{ fontSize: '1rem', paddingLeft: '5px' }}>Logout</span>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i>
                    <span style={{ fontSize: '1rem', paddingLeft: '5px' }}>Sign In</span>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

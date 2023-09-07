import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge'
import Modal from '../Model';
import Cart from '../screens/Cart';
import {useNavigate } from "react-router-dom";
import { useCart } from './ContextReducer';

function Header() {
  const [cartView, setCartView] = useState(false)

  const cart = useCart();
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate("/login")
  }
  return (
    <div>
      <Navbar expand="lg" className="bg-dark bg-gradient text-white">
        <Navbar.Brand href="/" className='navbar-brand fs-1 fst-italic text-white'>OneBite</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            <div>
              <Nav.Link style={{ margin: '12px' }} href="/" className='text-black bg-white'>HomePage</Nav.Link>
            </div>
            {(localStorage.getItem("authToken")) ?
              <div>
                <Nav.Link style={{ margin: '12px' }} href="/myorder" className='text-black bg-white'>My Orders</Nav.Link>
              </div>
              : ""
            }
          </Nav>
          <div>
            {(!localStorage.getItem("authToken")) ?
              <div>
                <Nav className="ml-auto">
                  <div style={{ margin: '12px' }}>
                    <Nav.Link href="/login" className='text-black bg-white'>LoginPage</Nav.Link>
                  </div>
                  <div style={{ margin: '12px' }}>
                    <Nav.Link href="/signup" className='text-black bg-white'>SignUpPage</Nav.Link>
                  </div>
                </Nav>
              </div>
              :
              <div>
                <Nav className="ml-auto">
                  <div style={{ margin: '12px' }} >
                    <Nav.Link className='text-black bg-white'onClick={() => {setCartView(true)}}> My Cart
                      <Badge style={{ marginLeft: '8px' }} color="secondary" className='bg-danger'  >
                      {cart.length}
                      </Badge>
                    </Nav.Link>
                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart/></Modal> : ""}
                  </div>
                  <div style={{ margin: '12px' }}>
                    <Nav.Link href="/login" className='text-black bg-white' onClick={handleLogout}>LogOut</Nav.Link>
                  </div>
                </Nav>
              </div>
            }
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>

  );
}

export default Header;
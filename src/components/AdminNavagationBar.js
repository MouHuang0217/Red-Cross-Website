import React, { Component, useState } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'
import Logo from "../arc_logo.png";
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../src/Logo_Landscape.jpg';
export default function AdminNavigationBar() {
  const { logout, currentUser } = useAuth()
  const [error, setError] = useState('')
  const history = useHistory()
  async function handleLogOut() {
    setError('')
    try {
      await logout()
      // history.push('/login')
    }
    catch {
      setError("Failed to log out")
    }
  }
  return (

    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      {/* <a class="navbar-brand" href="#">
            <img src={logo} alt="..." height="36"></img>
          </a> */}
      <Navbar.Brand className="px-2" href="#home">Red Cross Website</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto pr-5">
            <Nav.Link href="/AdminHome">Home</Nav.Link>
            {/* <Nav.Link href="/About">About Us</Nav.Link> */}
            <NavDropdown title="Admin Functionalities" id="basic-nav-dropdown">
              <NavDropdown.Item href="/CreatePosts">Create Post</NavDropdown.Item>
              <NavDropdown.Item href="/ListEmails">Email List</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider className="d-sm-none" />
            </NavDropdown>
            <NavDropdown className="d-md-block d-lg-none" title="Account" id="basic-nav-dropdown">
              {(!currentUser && <NavDropdown.Item className="d-md-block d-lg-none" href="/Login">Login </NavDropdown.Item>)}
              {(!currentUser && <NavDropdown.Item className="d-md-block d-lg-none" href="/Register">Register </NavDropdown.Item>)}
              {(currentUser && <NavDropdown.Item className="d-md-block d-lg-none" href="/profile">Profile </NavDropdown.Item>)}
              {(currentUser && <NavDropdown.Item className="d-md-block d-lg-none" onClick={handleLogOut}>Logout </NavDropdown.Item>)}
              {/* <NavDropdown.Item href="/">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider className="d-sm-none" />
              {/* take out className to show items in divided dropdown */}
              {/* {(!currentUser && <NavDropdown.Item className="d-md-block d-lg-none" href="/Login">Login </NavDropdown.Item>)}
              {(!currentUser && <NavDropdown.Item className="d-md-block d-lg-none" href="/Register">Register </NavDropdown.Item>)}
              {(currentUser && <NavDropdown.Item className="d-md-block d-lg-none" href="/profile">Profile </NavDropdown.Item>)}
        {(currentUser && <NavDropdown.Item className="d-md-block d-lg-none" onClick={handleLogOut}>Logout </NavDropdown.Item>)} */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {(!currentUser && <a class="btn btn-light ms-3 d-none d-lg-inline" role="button" href="/Login">Login</a>)}
        {(!currentUser && <a class="btn btn-light ms-3 d-none d-lg-inline" role="button" href="/register">Register</a>)}
        {(currentUser && currentUser.emailVerified && <a class="btn btn-light ms-3 d-none d-lg-inline" role="button" href="/profile">Profile</a>)}
        {(currentUser && <a class="btn btn-light ms-3 d-none d-lg-inline" role="button" onClick={handleLogOut}>Log Out</a>)}
      </Container>
    </Navbar >
  )
}





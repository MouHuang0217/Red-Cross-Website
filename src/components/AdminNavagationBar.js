import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function AdminNavigationBar() {
  const { logout, currentUser } = useAuth()
  const [error, setError] = useState('')
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

    <Navbar bg="danger" variant="dark" expand="lg" sticky="top">
      {/* <a class="navbar-brand" href="#">
            <img src={logo} alt="..." height="36"></img>
          </a> */}
      <Navbar.Brand className="px-2" href="/AdminHome"><strong>Red Cross CSULB</strong></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto pr-5">
            <Nav.Link href="/AdminHome"><strong>Home</strong></Nav.Link>
            <Nav.Link href="/AdminAbout"><strong>About Us</strong></Nav.Link>
            <Nav.Link href="/AdminSurveys"><strong>Surveys</strong></Nav.Link>

            {/* <Nav.Link href="/About">About Us</Nav.Link> */}
            <NavDropdown title="Admin Functionalities" id="basic-nav-dropdown">
              <NavDropdown.Item href="/CreateSurveys">Create Survey</NavDropdown.Item>
              <NavDropdown.Item href="/CreatePosts">Create Post</NavDropdown.Item>
              <NavDropdown.Item href="/ListEmails">Email List</NavDropdown.Item>
              <NavDropdown.Divider className="d-sm-none" />
            </NavDropdown>
            <NavDropdown className="d-md-block d-lg-none" title="Account" id="basic-nav-dropdown">
              {(!currentUser && <NavDropdown.Item className="d-md-block d-lg-none" href="/Login"><strong>Login</strong> </NavDropdown.Item>)}
              {(!currentUser && <NavDropdown.Item className="d-md-block d-lg-none" href="/Register"><strong>Register</strong> </NavDropdown.Item>)}
              {(currentUser && <NavDropdown.Item className="d-md-block d-lg-none" onClick={handleLogOut}><strong>Logout</strong> </NavDropdown.Item>)}
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
        {(!currentUser && <a class="btn btn-light ms-3 d-none d-lg-inline" role="button" href="/Login"><strong>Login</strong></a>)}
        {(!currentUser && <a class="btn btn-light ms-3 d-none d-lg-inline" role="button" href="/register"><strong>Register</strong></a>)}
        {(currentUser && <a class="btn btn-light ms-3 d-none d-lg-inline" role="button" onClick={handleLogOut}><strong>Log Out</strong></a>)}
      </Container>
    </Navbar >
  )
}





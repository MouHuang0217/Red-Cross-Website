import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
export default function MainNavigation() {
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

    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" bg="danger">
      <Navbar.Brand className="px-2" href="/"><strong>Red Cross CSULB</strong></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto pr-5">
            <Nav.Link href="/"><strong>Home</strong></Nav.Link>
            <Nav.Link href="/About"><strong>About Us</strong></Nav.Link>
            <Nav.Link href="/Surveys"><strong>Surveys</strong></Nav.Link>
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
        {(!currentUser && <a class="btn btn-light ms-3 d-none d-lg-inline" role="button" href="/Login"><strong>Login</strong></a>)}
        {(!currentUser && <a class="btn btn-light ms-3 d-none d-lg-inline" role="button" href="/register"><strong>Register</strong></a>)}
        {(currentUser && currentUser.emailVerified && <a class="btn btn-light ms-3 d-none d-lg-inline" role="button" href="/profile"><strong>Profile</strong></a>)}
        {(currentUser && <a class="btn btn-light ms-3 d-none d-lg-inline" role="button" onClick={handleLogOut}><strong>Log Out</strong></a>)}
      </Container>
    </Navbar >
  )
}
{/* <div>
    //   <div className="mainnavbar">
    //     <Navbar collapseOnSelect fixedTop className="justify-content-between">
    //       <Navbar.Brand href="/"><img alt="logo" src={Logo} className="logo" /></Navbar.Brand>
    //       <Navbar.Toggle />
    //       <Navbar.Collapse className="justify-content-end">
    //         <NavItem pullRight>
    //           {(!currentUser && <Button className="loginbutton" variant="dark" href="/login">LOGIN</Button>)}
    //           {(!currentUser && <Button className="registerbutton" variant="dark" href="/register">REGISTER</Button>)}
    //           {(currentUser && <Button className="loginbutton" variant="dark" href="/profile">Profile</Button>)}
    //           {(currentUser && <Button className="registerbutton" variant="dark" onClick={handleLogOut}>Log Out</Button>)}
    //         </NavItem>
    //       </Navbar.Collapse>
    //     </Navbar>
    //   </div>
    //   <div>
    //     {(currentUser && <div>{currentUser.email}</div>)}
    //   </div>
    // </div> */}




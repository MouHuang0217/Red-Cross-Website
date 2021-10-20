import React, { Component, useState } from "react";
import { Navbar, NavItem, Button } from "react-bootstrap";
import Logo from "../arc_logo.png";
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function MainNavigation() {
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
    <div>
      <div className="mainnavbar">
        <Navbar collapseOnSelect fixedTop className="justify-content-between">
          <Navbar.Brand href="/"><img alt="logo" src={Logo} className="logo" /></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <NavItem pullRight>

              {(!currentUser && <Button className="loginbutton" variant="dark" href="/login">LOGIN</Button>)}
              {(!currentUser && <Button className="registerbutton" variant="dark" href="/register">REGISTER</Button>)}
              {(currentUser && <Button className="registerbutton" variant="dark" onClick={handleLogOut}>Log Out</Button>)}
            </NavItem>
          </Navbar.Collapse>
        </Navbar>
      </div>
      {(currentUser && <div>{currentUser.email}</div>)}
    </div>


  )
}


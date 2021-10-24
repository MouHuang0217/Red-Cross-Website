import React, { Component, useState } from "react";
import { Navbar, NavItem, Button } from "react-bootstrap";
import Logo from "../arc_logo.png";
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

import { useFirestore } from '../contexts/FireStoreContext'

export default function MainNavigation() {
  const { logout, currentUser } = useAuth()
  const { getPosts } = useFirestore()
  const [error, setError] = useState('')
  const history = useHistory()
  
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  async function showPosts(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await getPosts()
        } catch {
            setError("Failed to Log in")
        }

        setLoading(false)
    }

  return (
    <div>
      {(currentUser && <div>{currentUser.email}</div>)}
      <Button disabled={loading} className="w-100" type="submit" onClick={showPosts}>
            Show Posts
      </Button>
    </div>


  )
}
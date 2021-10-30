import React, { useRef, useState } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import Logo from "../arc_logo.png";
import GoogleSignInButton from "../btn_google_signin_dark_pressed_web.png";

import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, signInWithGoogle, currentUser, logout } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            if (currentUser.emailVerified == false) {
                console.log("isVerified", currentUser.emailVerified);
                logout();
                setError("Please verify your email")
            }
            else {
                console.log("isVerified", currentUser.emailVerified);
                history.push({
                    pathname: "/",
                    state: { isLoggedIn: loggedIn }
                })
            }
            setLoggedIn(true);
        } catch {
            setError("Failed to Log in")
        }
        setLoading(false)

    }
    async function handleGoogleSignIn(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await signInWithGoogle()
            history.push('/')
            setLoggedIn(true);
        } catch {
            setError("Failed to Log in")
        }

        setLoading(false)
    }
    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100">
                <>
                    <center>
                        <a href="/">
                            <img alt="logo" src={Logo} className="logo" />
                        </a>
                    </center>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Log In</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label className="mt-2">Email</Form.Label>
                                    <Form.Control className="mt-2" type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label className="mt-2">Password</Form.Label>
                                    <Form.Control className="mt-2" type="password" ref={passwordRef} required />
                                </Form.Group>

                                <Button disabled={loading} className="w-100 mt-3" type="submit">
                                    Log In
                                </Button>
                                {/* <button disabled={loading} className="w-100 mt-3" type="submit"><img src={GoogleSignInButton} onClick={handleGoogleSignIn} /></button> */}
                                {/* <Button disabled={loading} className="w-100 mt-3" type="submit" onClick={handleGoogleSignIn}> </Button> */}
                            </Form>
                        </Card.Body>
                    </Card>

                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to='/Register'>Sign Up </Link>
                    </div>
                    <div className="w-100 text-center mt-2">
                        Need to change your password? <Link to='/ChangePassword'>Change Password </Link>
                    </div>
                    <div className="w-100 text-center mt-2">
                        Admin? <Link to='/Admin'>Admin Log In </Link>
                    </div>
                </>
            </div>
        </Container >
    )
}
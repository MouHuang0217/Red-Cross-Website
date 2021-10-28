import React, { useRef, useState } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import Logo from "../arc_logo.png";
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Login() {
    const { logout, currentUser } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, signInWithGoogle } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push({
                pathname: "/",
                state: { isLoggedIn: loggedIn }
            })
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
        <Container class ="bg-light"
            style={{}}>
            <center>
                <a href="/">
                    <img alt="logo" src={Logo} className="logo" />
                </a>
            </center>
            <body class="bg-light">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-10 mt-5 pt-5">
                        <div class="row z-depth-3">
                            <div class="col-sm-4 bg-danger rounded-left">
                                <div class="card-block text-center text-white">
                                    <i class="fas fa-user-tie fa-7x mt-5"></i>
                                    <h2 class="font-weight-bold mt-4">Mou Lue Huang</h2>
                                    <p>Member</p>
                                    <h6 class="text-black"> i love coding!</h6>
                                    <i class="far fa-edit fa-2x mb-4"></i>
                                </div>
                            </div>

                            <div class="col-sm-8 bg-white rounded-right">
                                <h3 class="mt-3 text-center">Information</h3>
                                <hr class="badge-primary mt-0 w-30"></hr>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="font-weight-bold">Email:</p>
                                        <h6 class="text-muted">{currentUser.email}</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="font-weight-bold">Nickname:</p>
                                        <h6 class="text-muted">Mou Zedong</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </body>
        </Container>
    )
}
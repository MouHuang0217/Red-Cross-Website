import React, { useRef, useState } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'

import { useHistory } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css"
import Logo from "../arc_logo.png";
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { auth, fs } from "../firebase"

export default function Signup() {
    const firstName = useRef()
    const lastName = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser, sendVerificationEmail } = useAuth()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory(); //using for redirection

    async function handleSubmit(e) {
        e.preventDefault()
        //if password and confirmation is different set an error
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        //loading is to tell user that it is currently loading
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value).then(function (data) {
                console.log('uid', data.user.uid)
                const uid = data.user.uid
                addUserToDatabase(uid)
            });
            setSuccess("Check e-mail for verification link.")
            await sendVerificationEmail()
            setSuccess("Redirecting to log in page.")
            setTimeout(() => {
                history.push("/Login");
            }, 4000); //redirects page to Log In after 4 milliseconds
            // history.push("/") //redirects page to Home after signup function completes
        }
        catch (error) {
            console.log(error);
            if (error.code === 'auth/weak-password') {
                setError("Failed to create an account: weak password")
            }
            else if (error.code === 'auth/email-already-in-use') {
                setError("Email already in use, please log in instead");
            }
            else {
                setError("Failed to create an account")
            }
        }
        setLoading(false)
    }
    async function addUserToDatabase(uid) {

        //loading is to tell user that it is currently loading
        const userDetails = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            email: emailRef.current.value,
            nickname: "n/a",
            uid: uid,
            isAdmin: false,
            bio: ""
        }
        try {
            setError("")
            setLoading(true)
            console.log(userDetails)
            const collection = fs.collection("users")
            collection.add(userDetails)
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                // fs.collection("events").add(postDetails)
                // .then(function(docRef){
                //     console.log("Document written with ID: ", docRef.id);
                // })
                .catch(e => { console.log("Error adding document: ", e); });
        }
        catch (error) {
            console.log(error);

        }

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
                            <h2 className="text-center mb-4">Sign Up</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" ref={firstName} required />
                                </Form.Group>
                                <Form.Group id="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" ref={lastName} required />
                                </Form.Group>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} required />
                                </Form.Group>
                                <Button disabled={loading} className="w-100 mt-3" type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to='/Login'>Log In </Link>
                    </div>
                </>
            </div>
        </Container>
    )
}

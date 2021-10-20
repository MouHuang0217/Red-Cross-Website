import React, { useRef, useState } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import firebase from "../firebase"

export default function AdminLogin() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, signInWithGoogle, getUID, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const history = useHistory();

    async function checkIfAdmin(e) {
        // e.preventDefault()
        // console.log(firebase);
        const db = firebase.firestore()
        const data = await db.collection("users").get()
        // console.log(data.docs.map(doc => doc.data()));
        // console.log(data.docs.map(doc => doc.data()["UID"]));
        const data2 = data.docs.map(doc => doc.data());
        // console.log(data2);
        for (var i = 0; i < data.size; i++) {
            // console.log(data2[i]);
            // console.log(currentUser.getUID);
            // console.log(data2[i]['email']);
            var email = data2[i]['email'];
            if (email == emailRef.current.value) {
                console.log(data2[i]['email']);
                console.log(emailRef.current.value);
                console.log("Email is the same");
                console.log(data2[i]["isAdmin"]);
                if (data2[i]["isAdmin"] == true) {
                    console.log(email + " is Admin");
                    return true;
                }
            }
        }
        return false;
        // const users = await firebase.firestore.collection("users");
        // console.log(users);
    }
    async function handleSubmit(e) {
        e.preventDefault()
        var isadmin = await checkIfAdmin();
        console.log("user is" + isadmin);
        try {
            setError("")
            setLoading(true)
            if (isadmin == true) {
                await login(emailRef.current.value, passwordRef.current.value)
                console.log("Logged In");
                history.push({
                    pathname: "/AdminHome",
                    state: { isLoggedIn: loggedIn }
                })
                setLoggedIn(true);
            }
            else if (isadmin == false) {
                setError("Not an ADMIN account");
                console.log("Not Admin");
            }
            // const db = firebase.firestore()
            // const data = await db.collection("users").get();
            // const data2 = data.docs.map(doc => doc.data());


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
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Admin Log In</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>

                                <Button disabled={loading} className="w-100" type="submit">
                                    Log In
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Not an Admin? <Link to='/Login'>Login </Link>
                    </div>
                    {/* <Button disabled={loading} className="w-100" type="submit" onClick={checkIfAdmin}>
                        Testing
                    </Button> */}
                </>
            </div>
        </Container>
    )
}

import React, { useRef, useState } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import Logo from "../arc_logo.png";
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function ChangePassword() {
    const emailRef = useRef()
    const { changePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await changePassword(emailRef.current.value)
            alert('Check email for password reset instructions')
            history.push({
                pathname: "/Login"
            })
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
                            <h2 className="text-center mb-4">Change Password</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Button disabled={loading} className="w-100" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to='/Register'>Sign Up </Link>
                    </div>
                </>
            </div>
        </Container>
    )
}

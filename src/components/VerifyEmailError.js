import React, { useRef, useState, useEffect } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import Logo from "../arc_logo.png";
import GoogleSignInButton from "../btn_google_signin_dark_pressed_web.png";

import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'


export default function ErrorMessage() {
    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    useEffect(() => {
        if (currentUser != null) {
            if (currentUser.emailVerified == true) {
                console.log("isVerified", currentUser.emailVerified);

            }
            else {
                setError("Please Verify Email");
            }
        }

    })
    return (
        <div>
            {error && currentUser && <Alert variant="danger">{error}</Alert>}
        </div>
    )
}
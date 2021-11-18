import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"

import { useAuth } from '../contexts/AuthContext'


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
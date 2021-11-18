import React, { useRef, useState, useEffect } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import Logo from "../arc_logo.png";
import { useAuth } from '../contexts/AuthContext'
import AdminNavigation from './AdminNavagationBar';

import { fs } from "../firebase"
// import { storage } from "../firebase"

export default function Signup() {
    const postNameRef = useRef()
    const postStartDateRef = useRef()
    const postEndDateRef = useRef()
    const postLinkRef = useRef()

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [lastsurveyID, setlastsurveyID] = useState(1);
    useEffect(() => {
        const fetchID = async () => {
            getLastID();
        }
        fetchID()
    }, [])
    async function getLastID() {
        try {
            fs.collection("surveys").orderBy("ID").onSnapshot((snapshot) => {
                snapshot.forEach(
                    doc => {
                        var newData = doc.data().ID;
                        setlastsurveyID(newData);
                        // console.log(newData);
                    }
                )
            });
        } catch (error) {
            console.log(error);
        }
    }
    async function handleSubmit(e) {
        e.preventDefault()
        //if survey has no name set an error
        if (postNameRef.current.value === null) {
            return setError("Post must have a name")
        }
        //if survey has no date set an error
        if (postStartDateRef.current.value === null) {
            return setError("Post must have a start date")
        }
        if (postEndDateRef.current.value === null) {
            return setError("Post must have a end date")
        }
        if (postLinkRef.current.value === null) {
            return setError("Post must have a link")
        }
        //order surveys by id and increment the id by 1 for each new survey
        try {
            fs.collection("surveys").orderBy("id").onSnapshot((snapshot) => {
                snapshot.forEach(
                    doc => {
                        var newData = doc.data().id;
                        setlastsurveyID(newData);
                    }
                )
            });
        } catch (error) {
            console.log(error);

        }
        finally {
            console.log(lastsurveyID);
        }
        console.log("lastID" + lastsurveyID);
        var nextInt = lastsurveyID + 1;
        // setlastID(lastID);
        console.log("nextInt" + nextInt);
        const postDetails = {
            name: postNameRef.current.value,
            dateStarted: postStartDateRef.current.value,
            dateEnded: postEndDateRef.current.value,
            url: postLinkRef.current.value,
            ID: nextInt,
        }
        try {
            setError("")
            setLoading(true)
            console.log(postDetails)

            const collection = fs.collection("surveys")
            collection.add(postDetails)
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                // fs.collection("events").add(postDetails)
                //     .then(function (docRef) {
                //         console.log("Document written with ID: ", docRef.id);
                //     })
                .catch(e => { console.log("Error adding document: ", e); });
        }
        catch (error) {
            console.log(error);
        }
        setLoading(false)
        setSuccess("Survey has been created.")
        // postNameRef.current.value = "";
        // postStartDateRef.current.value = "";
        // postEndDateRef.current.value = "";
        // postLinkRef.current.value = "";
    }

    return (
        <div>
            <AdminNavigation />

            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-50">
                    <>
                        <center>
                            <a href="/">
                                <img alt="logo" src={Logo} className="logo" />
                            </a>
                        </center>
                        <Card>
                            <Card.Body>
                                <h2 className="text-center mb-4">Create Survey</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {success && <Alert variant="success">{success}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" ref={postNameRef} required />
                                    </Form.Group>
                                    <Form.Group id="date">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control type="date" ref={postStartDateRef} required />
                                    </Form.Group>
                                    <Form.Group id="date">
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control type="date" ref={postEndDateRef} required />
                                    </Form.Group>
                                    <Form.Group id="link" className="mb-5">
                                        <Form.Label>Link</Form.Label>
                                        <Form.Control type="text" ref={postLinkRef} required />
                                    </Form.Group>
                                    <Button disabled={loading} className="w-100" type="submit">
                                        Create Survey
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </>
                </div>
            </Container>
        </div>
    )
}
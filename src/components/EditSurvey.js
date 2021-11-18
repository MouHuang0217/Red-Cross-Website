import React, { useRef, useState, useEffect, } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import { useParams } from "react-router";
import firebase from "../firebase"

import { useHistory } from 'react-router-dom'

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


    const [surveyName, setSurveyName] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [link, setLink] = useState();

    // const { signup, currentUser, sendVerificationEmail } = useAuth()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [isEditing, setisEditing] = useState(true);

    const { docID } = useParams();

    const history = useHistory();

    const { currentUser } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            if (isEditing) {
                const data = await fs.collection("surveys").doc(docID).get();
                setSurveyName(data.data()['name'])
                setStartDate(data.data()['dateStarted'])
                setEndDate(data.data()['dateEnded'])
                setLink(data.data()['url'])

            }
            var isadmin = await checkIfAdmin();
            if (isadmin == false) {
                history.push({
                    pathname: "/Login",
                })
            }
        }

        fetchData()
    }, [])
    const onSurveyChange = (event) => {
        setisEditing(false);
        console.log(event.target.value);
        setSurveyName(event.target.value);
    };

    const onStartDateChange = (event) => {
        setisEditing(false);
        console.log(event.target.value);
        setStartDate(event.target.value);
    };
    const onEndDateChange = (event) => {
        setisEditing(false);
        console.log(event.target.value);
        setEndDate(event.target.value);
    };
    const onLinkChange = (event) => {
        setisEditing(false);
        console.log(event.target.value);
        setLink(event.target.value);
    };
    async function checkIfAdmin() {
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
            var uid = data2[i]['uid'];
            if (uid == currentUser.uid) {
                console.log(uid);
                console.log(currentUser.uid);
                console.log("UID is the same");
                console.log(data2[i]["isAdmin"]);
                if (data2[i]["isAdmin"] == true) {
                    console.log(uid + " is Admin");
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

        const surveyDetails = {
            name: postNameRef.current.value,
            dateStarted: postStartDateRef.current.value,
            dateEnded: postEndDateRef.current.value,
            url: postLinkRef.current.value,
        }

        try {
            setError("")
            setLoading(true)
            const collection = fs.collection("surveys").doc(docID)
            collection.update(surveyDetails);
        }
        catch (error) {
            console.log(error);
        }
        setLoading(false)
        setSuccess("Survey has been updated.")
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
                                <h2 className="text-center mb-4">Edit Survey</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {success && <Alert variant="success">{success}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" ref={postNameRef} value={surveyName} onChange={onSurveyChange} required />
                                    </Form.Group>
                                    <Form.Group id="date">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control type="date" ref={postStartDateRef} value={startDate} onChange={onStartDateChange} required />
                                    </Form.Group>
                                    <Form.Group id="date">
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control type="date" ref={postEndDateRef} value={endDate} onChange={onEndDateChange} required />
                                    </Form.Group>
                                    <Form.Group id="link" className="mb-5">
                                        <Form.Label>Link</Form.Label>
                                        <Form.Control type="text" ref={postLinkRef} value={link} onChange={onLinkChange} required />
                                    </Form.Group>
                                    <Button disabled={loading} className="w-100" type="submit">
                                        Update Survey
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
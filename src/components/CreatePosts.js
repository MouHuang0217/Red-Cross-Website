import React, { useRef, useState } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'

import { useHistory } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css"
import Logo from "../arc_logo.png";
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

import { fs } from "../firebase"

export default function Signup() {
    const postNameRef = useRef()
    const postDateRef = useRef()
    const postTimeRef = useRef()
    // const postModeRef = useRef()
    const postTypeRef = useRef()
    // const isEventRef = useRef()
    // const isSurveyRef = useRef()
    const postLocationRef = useRef()
    const postLinkRef = useRef()
    const postDescriptionRef = useRef()


    // const { signup, currentUser, sendVerificationEmail } = useAuth()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory(); //using for redirection
    const { getUID, currentUser } = useAuth()


    // async function createPost(e, postDetails) {
    //     // e.preventDefault()
    //     // console.log(firebase);
    //     var postType = postDetails["type"];
    //     //const db = firebase.firestore()
    //     //const data = await db.collection("users").get()
    //     // console.log(data.docs.map(doc => doc.data()));
    //     // console.log(data.docs.map(doc => doc.data()["UID"]));
    //     //const data2 = data.docs.map(doc => doc.data());
    //     // console.log(data2);
    //     fs.collection(postType).add(postDetails)
    //     .catch(e => {console.log("Error adding document: ", e);});

    //     // for (var i = 0; i < data.size; i++) {
    //     //     // console.log(data2[i]);
    //     //     // console.log(currentUser.getUID);
    //     //     // console.log(data2[i]['email']);
    //     //     var email = data2[i]['email'];
    //     //     if (email == emailRef.current.value) {
    //     //         console.log(data2[i]['email']);
    //     //         console.log(emailRef.current.value);
    //     //         console.log("Email is the same");
    //     //         console.log(data2[i]["isAdmin"]);
    //     //         if (data2[i]["isAdmin"] == true) {
    //     //             console.log(email + " is Admin");
    //     //             return true;
    //     //         }
    //     //     }
    //     // }
    //     // return false;
    //     // // const users = await firebase.firestore.collection("users");
    //     // // console.log(users);
    // }
    async function Testing(e) {
        // fs.collection("posts").where("isEvent", "==", true).get()
        fs.collection("users").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    //doc.data() is never undefined for query doc snapshots
                    // console.log(currentUser.uid)
                    // console.log(currentUser.uid)

                    if (doc.data()['UID'] == currentUser.uid) {
                        console.log(doc.id)
                        console.log(doc.data())
                    }
                })
            })
    }
    async function handleSubmit(e) {
        e.preventDefault()
        //if event has no name set an error
        if (postNameRef.current.value === null) {
            return setError("Post must have a name")
        }
        //if event has no date set an error
        if (postDateRef.current.value === null) {
            return setError("Post must have a date")
        }
        if (postTimeRef.current.value === null) {
            return setError("Post must have a time")
        }
        if (postLocationRef.current.value === null) {
            return setError("Post must have a location")
        }
        if (postLinkRef.current.value === null) {
            return setError("Post must have a link")
        }
        if (postDescriptionRef.current.value === null) {
            return setError("Post must have a description")
        }
        //if event has no mode set an error
        if (postTypeRef.current.value === null) {
            return setError("Post must be event or a survey")
        }
        //loading is to tell user that it is currently loading
        const postDetails = {
            name: postNameRef.current.value,
            date: postDateRef.current.value,
            time: postTimeRef.current.value,
            location: postLocationRef.current.value,
            link: postLinkRef.current.value,
            description: postDescriptionRef.current.value,
            type: postTypeRef.current.value
        }
        try {
            setError("")
            setLoading(true)
            console.log(postDetails)
            // console.log(postDetails["type"])
            // console.log(postDetails["date"])
            // console.log(postDetails["name"])
            // await createPost(postDetails)
            const collection = fs.collection("events")
            collection.add(postDetails)
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
        setLoading(false)
        setSuccess("Post has been created.")
        postNameRef.current.value = "";
        postDateRef.current.value = "";
        postTimeRef.current.value = "";
        postLocationRef.current.value = "";
        postLinkRef.current.value = "";
        postDescriptionRef.current.value = "";
        postTypeRef.current.value = "";
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
                            <h2 className="text-center mb-4">Create Post</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" ref={postNameRef} required />
                                </Form.Group>
                                <Form.Group id="date">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" ref={postDateRef} required />
                                </Form.Group>
                                <Form.Group id="time">
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control type="time" ref={postTimeRef} required />
                                </Form.Group>
                                <Form.Group id="location">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control type="text" ref={postLocationRef} required />
                                </Form.Group>
                                <Form.Group id="link">
                                    <Form.Label>Link</Form.Label>
                                    <Form.Control type="text" ref={postLinkRef} required />
                                </Form.Group>
                                <Form.Group id="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" ref={postDescriptionRef} required />
                                </Form.Group>
                                <Form.Group id="type">
                                    <Form.Label>Post Type</Form.Label>
                                    <Form.Control type="text" ref={postTypeRef} required />
                                </Form.Group>
                                <Button disabled={loading} className="w-100" type="submit">
                                    Create Post
                                </Button>
                            </Form>
                            <Button onClick={Testing} className="w-100" type="submit">
                                Testing
                            </Button>
                        </Card.Body>
                    </Card>
                </>
            </div>
        </Container>
    )
}
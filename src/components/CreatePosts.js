import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Container, Alert, Image } from 'react-bootstrap'

import { useHistory } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css"
import Logo from "../arc_logo.png";
import { useAuth } from '../contexts/AuthContext'
import AdminNavigation from './AdminNavagationBar';

import { fs } from "../firebase"
// import { storage } from "../firebase"

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
    const postPicRef = useRef()

    const toNameRef = useRef()
    const subjectLineRef = useRef()
    const EmailRef = useRef()

    // const { signup, currentUser, sendVerificationEmail } = useAuth()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory(); //using for redirection
    const { getUID, currentUser } = useAuth()
    const [lastID, setlastID] = useState();
    const [posts, setPosts] = useState([]);
    const [createdEvent, setCreatedEvent] = useState(false);
    useEffect(() => {
        const fetchID = async () => {
            getLastID();
        }
        fetchID()
    }, [])
    async function getLastID() {
        try {
            fs.collection("events").orderBy("id").onSnapshot((snapshot) => {
                snapshot.forEach(
                    doc => {
                        var newData = doc.data().id;
                        setlastID(newData);
                        // console.log(newData);
                    }
                )
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function clearPic(e) {
        e.preventDefault();
        document.getElementById("pic").value = "";
        // document.getElementById("profile-pic").src = ProfilePic;
        document.getElementById("profile-pic").src = "";
    }

    async function previewPic(event) {
        var pic = event.target; //get image from target event triggered by onChange
        var fileRead = new FileReader();
        fileRead.onload = function () {
            document.getElementById("profile-pic").src = fileRead.result;
        };
        fileRead.readAsDataURL(pic.files[0]); //show preview of image
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
        if (postDescriptionRef.current.value === null) {
            return setError("Post must have a description")
        }

        var imgSrc = document.getElementById("profile-pic").src //refactor
        //loading is to tell user that it is currently loading

        console.log(lastID);
        var nextInt = lastID + 1;
        setlastID(nextInt);
        // console.log("nextInt" + nextInt);

        console.log(postTimeRef.current.value);
        const postDetails = {
            name: postNameRef.current.value,
            date: postDateRef.current.value,
            time: postTimeRef.current.value,
            location: postLocationRef.current.value,
            link: postLinkRef.current.value,
            description: postDescriptionRef.current.value,
            pic: imgSrc, //refactor,
            id: nextInt,
            attendees: []
        }

        addToFirebase(postDetails, lastID);

        // console.log("lastID" + lastID);
        var senders = await getAllEmails();


        setLoading(false)
        setSuccess("Created Post Success. Scroll down for your email template.");
        setCreatedEvent(true);
        toNameRef.current.value = senders;
        subjectLineRef.current.value = "CSULB New event: " + postNameRef.current.value
        EmailRef.current.value = "Dear CSULB Members,\n\n" + "\tWe have a new event: " + postNameRef.current.value + "\n\nFrom, \n\tCSULB Red Cross"
        postNameRef.current.value = "";
        postDateRef.current.value = "";
        postTimeRef.current.value = "";
        postLocationRef.current.value = "";
        postLinkRef.current.value = "";
        postDescriptionRef.current.value = "";
        imgSrc = ""; //refactor

    }
    async function getAllEmails() {
        const data = await fs.collection('users').get();
        // console.log(data.docs.map(doc => doc.data()));
        // console.log(data.docs.map(doc => doc.data()["UID"]));
        const data2 = data.docs.map(doc => doc.data());
        // console.log(data2);
        var senders = ""
        for (var i = 0; i < data.size; i++) {
            var email = data2[i]['email'];
            senders += email + ",";
        }
        return senders;
    }
    async function addToFirebase(postDetails, lastID) {
        try {
            setError("")
            setLoading(true)
            console.log(postDetails)

            const collection = fs.collection("events")
            collection.add(postDetails)
                .then(function (docRef) {
                    console.log("Document written with docID: ", docRef.id, " and id" + lastID);
                })
                .catch(e => { console.log("Error adding document: ", e); });
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <body>
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

                                <div className="p-4 block-example border border-dark">

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
                                            <Form.Control type="text" ref={postDateRef} required />
                                        </Form.Group>
                                        <Form.Group id="time">
                                            <Form.Label>Time</Form.Label>
                                            <Form.Control type="text" ref={postTimeRef} required />
                                        </Form.Group>
                                        <Form.Group id="location">
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control type="text" ref={postLocationRef} required />
                                        </Form.Group>
                                        <Form.Group id="link">
                                            <Form.Label>Link</Form.Label>
                                            <Form.Control type="text" ref={postLinkRef} />
                                        </Form.Group>
                                        <Form.Group id="description">
                                            <Form.Label>Description</Form.Label>
                                            {/* <Form.Control type="text" ref={postDescriptionRef} required /> */}
                                            <Form.Control as="textarea" rows={3} ref={postDescriptionRef} required />
                                        </Form.Group>
                                        <Form.Group className="mb-5">
                                            {/* <Form.Label>Post Image</Form.Label> */}
                                            <Image style={{ width: "30%", height: "30%", margin: "auto" }} id="profile-pic" alt="Post Image" />
                                            <Form.Control id="pic" type="file" /*id="pic"*/ accept='image/*' onChange={previewPic} /*innerHTML="Choose image for post"*/ />
                                            <Button onClick={clearPic}>Clear</Button>
                                        </Form.Group>
                                        <Button disabled={loading} className="w-100" type="submit">
                                            Create Post
                                        </Button>
                                    </Form>

                                </div>
                            </>
                        </div>
                    </Container>
                </div >
            </body>
            {(createdEvent &&
                <body>
                    <div>
                        <Container
                            className="d-flex align-items-center justify-content-center"
                            style={{ minHeight: "100vh" }}
                        >
                            <div className="w-50">
                                <>
                                    <div className="p-4 block-example border border-dark">

                                        <h2 className="text-center mb-4">Email Template</h2>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group id="To">
                                                <Form.Label>To</Form.Label>
                                                <Form.Control type="text" ref={toNameRef} required />
                                            </Form.Group>
                                            <Form.Group id="Subject Line">
                                                <Form.Label>Subject Line</Form.Label>
                                                <Form.Control type="text" ref={subjectLineRef} required />
                                            </Form.Group>
                                            <Form.Group id="description">
                                                <Form.Label>Email</Form.Label>
                                                {/* <Form.Control type="text" ref={postDescriptionRef} required /> */}
                                                <Form.Control as="textarea" rows={10} ref={EmailRef} required />
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </>
                            </div>
                        </Container>
                    </div >
                </body>
            )}
        </div>
    )
}
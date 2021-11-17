import React, { useRef, useState, useEffect, } from 'react'
import { Card, Form, Button, Container, Alert, Image } from 'react-bootstrap'
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

    // const { signup, currentUser, sendVerificationEmail } = useAuth()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const { docID } = useParams();

    const [eventName, setEventName] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [location, setLocation] = useState();
    const [link, setLink] = useState();
    const [description, setDescription] = useState();
    const [postType, setPostType] = useState();
    const [picture, setPicture] = useState();
    const [isEditing, setisEditing] = useState(true);
    const history = useHistory();

    const { currentUser } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            // if (isEditing) {
            //     const data = await fs.collection("events").doc(docID).get();
            //     setEventName(data.data()['name']);
            //     setDate(data.data()['date']);
            //     setTime(data.data()['time']);
            //     setLocation(data.data()['location']);
            //     setLink(data.data()['link']);
            //     setDescription(data.data()['description']);
            //     setPostType(data.data()['type']);
            //     setPicture(data.data()['pic']);
            // }
            var isadmin = await checkIfAdmin();
            if (isadmin == false) {
                history.push({
                    pathname: "/Login",
                })
            }
        }

        fetchData()
    }, [])
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
    const onEventChange = (event) => {
        setisEditing(false);
        console.log(event.target.value);
        setEventName(event.target.value);
    };
    const onDateChange = (event) => {
        setisEditing(false);
        console.log(event.target.value);
        setDate(event.target.value);
    };
    const onTimeChange = (event) => {
        setisEditing(false);
        console.log(event.target.value);
        setTime(event.target.value);
    };
    const onLocationChange = (event) => {
        setisEditing(false);
        console.log(event.target.value);
        setLocation(event.target.value);
    };
    const onLinkChange = (event) => {
        setisEditing(false);
        console.log(event.target.value);
        setLink(event.target.value);
    };
    const onDescriptionChange = (event) => {
        setisEditing(false);
        console.log(event.target.value);
        setDescription(event.target.value);
    };
    const onPostTypeChange = (event) => {
        setisEditing(false);
        console.log(event.target.value);
        setPostType(event.target.value);
    };


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
        var imgSrc = document.getElementById("profile-pic").src //refactor
        //loading is to tell user that it is currently loading
        const postDetails = {
            name: postNameRef.current.value,
            date: postDateRef.current.value,
            time: postTimeRef.current.value,
            location: postLocationRef.current.value,
            link: postLinkRef.current.value,
            description: postDescriptionRef.current.value,
            type: postTypeRef.current.value,
            pic: imgSrc //refactor
        }
        try {
            setError("")
            setLoading(true)
            console.log(postDetails)
            // console.log(postDetails["type"])
            // console.log(postDetails["date"])
            // console.log(postDetails["name"])
            // await createPost(postDetails)
            const collection = fs.collection("events").doc(docID)
            collection.update(postDetails);
        }
        catch (error) {
            console.log(error);

        }
        setLoading(false)
        setSuccess("Post has been updated.")
        postNameRef.current.value = "";
        postDateRef.current.value = "";
        postTimeRef.current.value = "";
        postLocationRef.current.value = "";
        postLinkRef.current.value = "";
        postDescriptionRef.current.value = "";
        postTypeRef.current.value = "";
        imgSrc = ""; //refactor
    }
    return (
        <div>
            <AdminNavigation />
            {/* <h1>User id is {eventName}</h1> */}
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-50">
                    <div>{docID}</div>
                    <center>
                        <a href="/">
                            <img alt="logo" src={Logo} className="logo" />
                        </a>
                    </center>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Editing Post</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" ref={postNameRef} value={eventName} onChange={onEventChange} />
                                </Form.Group>
                                <Form.Group id="date">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" ref={postDateRef} value={date} onChange={onDateChange} required />
                                </Form.Group>
                                <Form.Group id="time">
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control type="time" ref={postTimeRef} value={time} onChange={onTimeChange} required />
                                </Form.Group>
                                <Form.Group id="location">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control type="text" ref={postLocationRef} value={location} onChange={onLocationChange} required />
                                </Form.Group>
                                <Form.Group id="link">
                                    <Form.Label>Link</Form.Label>
                                    <Form.Control type="text" ref={postLinkRef} value={link} onChange={onLinkChange} required />
                                </Form.Group>
                                <Form.Group id="description">
                                    <Form.Label>Description </Form.Label>
                                    {/* <Form.Control type="text" ref={postDescriptionRef} required /> */}
                                    <Form.Control as="textarea" rows={3} ref={postDescriptionRef} value={description} onChange={onDescriptionChange} required />
                                </Form.Group>
                                <Form.Group id="type">
                                    <Form.Label>Post Type</Form.Label>
                                    <Form.Control type="text" ref={postTypeRef} value={postType} onChange={onPostTypeChange} required />
                                </Form.Group>
                                <Form.Group className="mb-5">
                                    {/* <Form.Label>Post Image</Form.Label> */}
                                    <Image style={{ width: "30%", height: "30%", margin: "auto" }} id="profile-pic" alt="Post Image" src={picture} />
                                    <Form.Control id="pic" type="file" /*id="pic"*/ accept='image/*' onChange={previewPic} /*innerHTML="Choose image for post"*/ />
                                    <Button onClick={clearPic} variant="danger">Delete Pic</Button>
                                </Form.Group>

                                <Button disabled={loading} className="w-100" type="submit">
                                    Save
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    )
}
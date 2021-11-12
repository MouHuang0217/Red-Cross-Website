import React, { useRef, useState } from 'react'
import { Card, Form, Button, Container, Alert, Image } from 'react-bootstrap'

import { useHistory } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css"
import Logo from "../arc_logo.png";
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import AdminNavigation from './AdminNavagationBar';

import ProfilePic from '../profileDefaultPic.png';

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
    const history = useHistory(); //using for redirection
    const { getUID, currentUser } = useAuth()
    const [lastID, setlastID] = useState(1);
    const [posts, setPosts] = useState([]);

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
        var imgSrc = document.getElementById("profile-pic").src //refactor
        //loading is to tell user that it is currently loading

        try {
            fs.collection("events").orderBy("id").onSnapshot((snapshot) => {
                snapshot.forEach(
                    doc => {
                        var newData = doc.data().id;
                        setlastID(newData);
                    }
                )
            });
            // console.log(data2);

        } catch (error) {
            console.log(error);

        }
        finally {
            console.log(lastID);
        }
        console.log("lastID" + lastID);
        var nextInt = lastID + 1;
        // setlastID(lastID);
        console.log("nextInt" + nextInt);
        const postDetails = {
            name: postNameRef.current.value,
            date: postDateRef.current.value,
            time: postTimeRef.current.value,
            location: postLocationRef.current.value,
            link: postLinkRef.current.value,
            description: postDescriptionRef.current.value,
            type: postTypeRef.current.value,
            pic: imgSrc, //refactor,
            id: nextInt,
            attendees: []
        }
        try {
            setError("")
            setLoading(true)
            console.log(postDetails)

            const collection = fs.collection("events")
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
        setSuccess("Post has been created.")
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
                                        {/* <Form.Control type="text" ref={postDescriptionRef} required /> */}
                                        <Form.Control as="textarea" rows={3} ref={postDescriptionRef} required />
                                    </Form.Group>
                                    <Form.Group id="type">
                                        <Form.Label>Post Type</Form.Label>
                                        <Form.Control type="text" ref={postTypeRef} required />
                                    </Form.Group>
                                    <Form.Group className="mb-5">
                                        {/* <Form.Label>Post Image</Form.Label> */}
                                        <Image style={{ width: "30%", height: "30%", margin: "auto" }} id="profile-pic" alt="Post Image" />
                                        <Form.Control id="pic" type="file" /*id="pic"*/ accept='image/*' onChange={previewPic} /*innerHTML="Choose image for post"*/ />
                                        <Button onClick={clearPic}>Clear</Button>
                                    </Form.Group>
                                    {/* <Form.Label>Post Image</Form.Label>
                                <Image style={{width: "25%", height: "25%", margin: "auto"}} src={ProfilePic} id="profile-pic" alt="Profile Face" /> */}
                                    {/* refactor                <img src={ProfilePic} id="profile-pic" alt="Profile Face" style={{width: "50%", height: "50%", margin: "auto"}}></img> */}
                                    {/* refactor                <input type="file" id="pic" accept='image/*' onChange={previewPic} innerHTML="Choose profile picture."/> */}
                                    {/* refactor                <button onClick={clearPic}>Clear</button> */}

                                    {/* <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Choose graphic for post</Form.Label>
                                    <Form.Control type="file" allow="image/*" ref={postPicRef} />
                                </Form.Group> */}

                                    {/* <Form.Group id="graphic">
                                    <Form.Label>Picture</Form.Label>
                                    <Form.Control type="file" accept="image/*" ref={postPicRef}/>
                                </Form.Group> */}
                                    {/* <img src={ProfilePic} id="profile-pic" alt="Profile Face" style={{width: "30%", height: "30%", margin: "auto"}}></img>
                        <input type="file" id="pic" accept='image/*' onChange={this.previewPic} innerHTML="Choose profile picture."/> */}
                                    <Button disabled={loading} className="w-100" type="submit">
                                        Create Post
                                    </Button>
                                </Form>
                                {/* <Button onClick={Testing} className="w-100" type="submit">
                                Testing
                            </Button> */}
                            </Card.Body>
                        </Card>
                    </>
                </div>
            </Container>
        </div>
    )
}
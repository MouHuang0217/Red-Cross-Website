// import React, { useRef, useState } from 'react'
// import { Card, Form, Button, Container, Alert } from 'react-bootstrap'

// import { useHistory } from 'react-router-dom'

// import "bootstrap/dist/css/bootstrap.min.css"
// import Logo from "../arc_logo.png";
// import { useAuth } from '../contexts/AuthContext'
// import { Link } from 'react-router-dom'

// import { fs } from "../firebase"

// export default function Signup() {
//     const postNameRef = useRef()
//     const postDateRef = useRef()
//     const postModeRef = useRef()
//     const postTypeRef = useRef()
//     // const isEventRef = useRef()
//     // const isSurveyRef = useRef()
//     const locationRef = useRef()
//     const linkRef = useRef()
//     const descriptionRef = useRef()


//     // const { signup, currentUser, sendVerificationEmail } = useAuth()
//     const [error, setError] = useState('')
//     const [success, setSuccess] = useState('')
//     const [loading, setLoading] = useState(false)
//     const history = useHistory(); //using for redirection

//     async function createPost(e, postDetails) {
//         // e.preventDefault()
//         // console.log(firebase);
//         var postType = postDetails["type"];
//         //const db = firebase.firestore()
//         //const data = await db.collection("users").get()
//         // console.log(data.docs.map(doc => doc.data()));
//         // console.log(data.docs.map(doc => doc.data()["UID"]));
//         //const data2 = data.docs.map(doc => doc.data());
//         // console.log(data2);
//         fs.collection(postType).add(postDetails)
//         .catch(e => {console.log("Error adding document: ", e);});
//         return;
        
//         // for (var i = 0; i < data.size; i++) {
//         //     // console.log(data2[i]);
//         //     // console.log(currentUser.getUID);
//         //     // console.log(data2[i]['email']);
//         //     var email = data2[i]['email'];
//         //     if (email == emailRef.current.value) {
//         //         console.log(data2[i]['email']);
//         //         console.log(emailRef.current.value);
//         //         console.log("Email is the same");
//         //         console.log(data2[i]["isAdmin"]);
//         //         if (data2[i]["isAdmin"] == true) {
//         //             console.log(email + " is Admin");
//         //             return true;
//         //         }
//         //     }
//         // }
//         // return false;
//         // // const users = await firebase.firestore.collection("users");
//         // // console.log(users);
//     }

//     async function handleSubmit(e) {
//         e.preventDefault()
//         //if event has no name set an error
//         if (postNameRef.current.value === null) {
//             return setError("Post must have a name")
//         }
//         return setSuccess("Post name is not empty")
//         //if event has no date set an error
//         if (postDateRef.current.value === null) {
//             return setError("Post must have a date")
//         }
//         //if event has no mode set an error
//         if (postTypeRef.current.value === null) {
//             return setError("Post must be event or a survey")
//         }
//         //loading is to tell user that it is currently loading
//         const postDetails = {
//             name : postNameRef.current.value,
//             date : postDateRef.current.value,
//             type : postTypeRef.current.value
//         }
//         try {
//             setError("")
//             setLoading(true)
//             console.log(postDetails) 
//             await createPost(postDetails)
//             // await signup(emailRef.current.value, passwordRef.current.value)
//             // setSuccess("Check e-mail for verification link.")
//             // await sendVerificationEmail()
//             // setSuccess("Redirecting to log in page.")
//             // setTimeout(() => {
//             //     history.push("/Login");
//             // }, 4000); //redirects page to Log In after 4 milliseconds
//             // // history.push("/") //redirects page to Home after signup function completes
//         }
//         catch (error) {
//             console.log(error);
//             if (error.code === 'auth/weak-password') {
//                 setError("Failed to create an account: weak password")
//             }
//             else if (error.code === 'auth/email-already-in-use') {
//                 setError("Email already in use, please log in instead");
//             }
//             else {
//                 setError("Failed to create an account")
//             }
//         }
//         setLoading(false)
//         setSuccess("Post has been created.")
//         postNameRef.current.value = "";
//         postDateRef.current.value = "";
//         postTypeRef.current.value = "";
//     }

//     return (
//         <Container
//             className="d-flex align-items-center justify-content-center"
//             style={{ minHeight: "100vh" }}
//         >
//             <div className="w-100">
//                 <>
//                     <center>
//                         <a href="/">
//                             <img alt="logo" src={Logo} className="logo" />
//                         </a>
//                     </center>

//                     <Card>
//                         <Card.Body>
//                             <h2 className="text-center mb-4">Create Post</h2>
//                             {error && <Alert variant="danger">{error}</Alert>}
//                             {success && <Alert variant="success">{success}</Alert>}

//                             <Form onSubmit={handleSubmit}>
//                                 <Form.Group id="name">
//                                     <Form.Label>Name</Form.Label>
//                                     <Form.Control type="text" ref={postNameRef} required />
//                                 </Form.Group>
//                                 <Form.Group id="date">
//                                     <Form.Label>Date</Form.Label>
//                                     <Form.Control type="date" ref={postDateRef} required />
//                                 </Form.Group>
//                                 <Form.Group id="type">
//                                     <Form.Label>Post Type</Form.Label>
//                                     <Form.Control type="text" ref={postTypeRef} required />
//                                 </Form.Group>
//                                 <Button disabled={loading} className="w-100" type="submit">
//                                     Create Post
//                                 </Button>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </>
//             </div>
//         </Container>
//     )
// }
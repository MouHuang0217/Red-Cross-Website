import React, { useState, useEffect, } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Logo from "../arc_logo.png";
import { useAuth } from '../contexts/AuthContext'
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { fs } from "../firebase"
import Navigation from './MainNavigation';
import ListEvents from './ListEvents';
export default () => {
    //current user info
    const { currentUser } = useAuth()
    const [firstName, setfirstName] = useState();
    const [lastName, setlastName] = useState();
    const [name, setname] = useState();

    const [nickname, setnickname] = useState();
    const [bio, setbio] = useState("");

    const [documentID, setdocumentID] = useState();
    const [isEditing, setisEditing] = useState(true);


    useEffect(() => {
        // fs.collection("posts").where("isEvent", "==", true).get()
        getUserData();
    })

    async function getUserData() {
        if (isEditing) {
            fs.collection("users").get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        if (currentUser.uid === doc.data().uid) {
                            // setfirstName(doc.data().firstName);
                            var firstName = doc.data().firstName;
                            var lastName = doc.data().lastName;
                            var name = firstName + " " + lastName;
                            setname(name);
                            setfirstName(firstName)
                            setlastName(lastName)
                            setnickname(doc.data().nickname);
                            setdocumentID(doc.id);
                        }
                    })
                })
        }
    }
    const onNameChange = (event) => {
        setisEditing(false);
        setname(event);
    };

    const onNickNameChange = (event) => {
        setisEditing(false);
        setnickname(event);
    };


    async function updateUserData() {
        // console.log(firstName);
        const userDetails = {
            firstName: firstName,
            // firstName: name,
            lastName: lastName,
            email: currentUser.email,
            nickname: nickname,
            uid: currentUser.uid,
            isAdmin: false,
            bio: bio
        }
        try {
            // setError("")
            const collection = fs.collection("users").doc(documentID)
            collection.update(userDetails);
        }
        catch (error) {
            console.log(error);
        }
        setisEditing(true);
        // setfirstName("doc.data().firstName");
    }

    return (
        <div>
            <React.Fragment>
                <Navigation />
                <center>
                    <a href="/">
                        <img alt="logo" src={Logo} className="logo" />
                    </a>
                </center>
                <body class="bg-light">
                    <div class="row d-flex justify-content-center">
                        <div class="col-md-10 mt-5 pt-5">
                            <div class="row z-depth-3">
                                <div class="col-sm-4 bg-danger rounded-left">
                                    <div class="card-block text-center text-white">
                                        <i class="fas fa-user-tie fa-7x mt-5"></i>
                                        {/* <EditText readonly="true" name="Name" type="name" style={{ width: '200px' }} defaultValue="First Name Last Name" inline /> */}
                                        <h4><EditText readonly="true" name="Bio" type="Bio" style={{ width: '200px' }} defaultValue={"n/a"} value={name} onChange={onNameChange} onSave={updateUserData} inline /></h4>

                                        {/* <h6><EditText name="Bio" type="Bio" style={{ width: '200px' }} defaultValue={"n/a"} value={firstName} onChange={onNameChange} onSave={updateUserData} inline /></h6> */}
                                        <i class="far fa-edit fa-2x mb-4"></i>
                                    </div>
                                </div>

                                <div class="col-sm-8 bg-white rounded-right">
                                    <h3 class="mt-3 text-center">Information</h3>
                                    <hr class="badge-primary mt-0 w-30"></hr>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <p class="font-weight-bold">Email: </p>
                                            <h6 class="text-muted">{currentUser.email}</h6>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="font-weight-bold">Nickname: </p>
                                            <h6 class="text-muted"><EditText name="Nickname" type="nickname" defaultValue="n/a" value={nickname} style={{ width: '200px' }} defaultValue="Nickname" onSave={updateUserData} onChange={onNickNameChange} inline /></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <Button href="/EditProfile">Edit</Button> */}
                        </div>
                    </div>
                    <span>&nbsp;
                        <span>&nbsp;
                            <div>
                                <ListEvents></ListEvents>
                            </div>
                        </span>
                    </span>
                </body>

            </React.Fragment>
        </div>
    )
}
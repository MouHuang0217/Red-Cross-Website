import React, { useState, useEffect, } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Logo from "../arc_logo.png";
import { useParams } from "react-router";
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { fs } from "../firebase"
import AdminNavigation from './AdminNavagationBar';

import ListUserEvents from './ListUserEvents';

export default () => {
    //current user info
    const [firstName, setfirstName] = useState();
    const [lastName, setlastName] = useState();
    const [name, setname] = useState();
    const [email, setEmail] = useState();

    const [nickname, setnickname] = useState();
    const [bio, setbio] = useState("");

    const { docID } = useParams();

    useEffect(() => {
        // fs.collection("posts").where("isEvent", "==", true).get()
        getUserData();
    })

    async function getUserData() {
        const data = await fs.collection("users").doc(docID).get();
        // console.log(data.data());
        setfirstName(data.data().firstName);
        setlastName(data.data().lastName);
        setname(firstName + " " + lastName);
        setbio(data.data().bio);
        setnickname(data.data().nickname);
        setEmail(data.data().email);
    }

    return (
        <div>
            <React.Fragment>
                <AdminNavigation />
                <center>
                    <a href="/AdminHome">
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
                                        <h4><EditText readonly="true" name="Bio" type="Bio" style={{ width: '200px' }} defaultValue={"n/a"} value={name} inline /></h4>

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
                                            <h6><EditText readonly="true" name="Email" type="Email" style={{ width: '200px' }} defaultValue={"n/a"} value={email} inline /></h6>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="font-weight-bold">Nickname: </p>
                                            <h6 class="text-muted"><EditText readonly="true" name="Nickname" type="nickname" defaultValue="n/a" value={nickname} style={{ width: '200px' }} defaultValue="Nickname" inline /></h6>
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
                                <ListUserEvents docID={docID}></ListUserEvents>
                            </div>
                        </span>
                    </span>
                </body>

            </React.Fragment>
        </div>
    )
}
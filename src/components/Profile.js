import React, { useRef, useState } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import Logo from "../arc_logo.png";
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

export default () => {
    //current user info
    const { logout, currentUser } = useAuth()
    return (
        <React.Fragment>
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

                                    <EditText name="Name" type="name" style={{ width: '200px' }} defaultValue="First Name Last Name" inline />
                                    <h6><EditText name="Bio" type="Bio" style={{ width: '200px' }} defaultValue="Bio" inline /></h6>
                                    <i class="far fa-edit fa-2x mb-4"></i>
                                </div>
                            </div>

                            <div class="col-sm-8 bg-white rounded-right">
                                <h3 class="mt-3 text-center">Information</h3>
                                <hr class="badge-primary mt-0 w-30"></hr>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="font-weight-bold">Email:</p>
                                        <h6 class="text-muted">{currentUser.email}</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="font-weight-bold">Nickname:</p>
                                        <h6 class="text-muted"><EditText name="Nickname" type="nickname" style={{ width: '200px' }} defaultValue="Nickname" inline /></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </body>
        </React.Fragment>
    )
}
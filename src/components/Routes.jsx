import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import AdminHome from "./AdminHome";

import { About } from "./About";
import { AdminAbout } from "./AdminAbout";

import Signup from './Signup';
import Login from './Login';
import ChangePassword from './ChangePassword';
import AdminLogin from "./AdminLogin";

import Profile from "./Profile";

// import EditProfile from "./EditProfile";

import CreatePosts from "./CreatePosts";
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

import CreateSurveys from "./CreateSurveys";

import Surveys from './Surveys'
import AdminSurveys from './AdminSurveys'


import ListEmails from "./ListEmails";

import EditEvent from "./EditEvent"
import EditSurvey from "./EditSurvey"

import UserPage from "./UserPage"

/*class to route to other components and link them to pages*/
export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div style={{ width: "100%" }}>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/Login" component={Login} />
          <Route path="/Surveys" component={Surveys} />

          <Route path="/Register" component={Signup} />
          <Route path="/ChangePassword" component={ChangePassword} />
          <Route path="/Admin" component={AdminLogin} />
          <PrivateRoute path="/Profile" component={Profile} />
          
          {/* <PrivateRoute path="/EditProfile" component={EditProfile} /> */}
          <AdminRoute path="/AdminAbout" component={AdminAbout} />
          <AdminRoute path="/CreatePosts" component={CreatePosts} />
          <AdminRoute path="/CreateSurveys" component={CreateSurveys} />
          <AdminRoute path="/AdminHome" component={AdminHome} />
          <AdminRoute path="/AdminSurveys" component={AdminSurveys} />
          <AdminRoute path="/user/:docID" component={UserPage} />

          <AdminRoute path="/ListEmails" component={ListEmails} />
          <Route path="/EditEvent/:docID" component={EditEvent} />
          <Route path="/EditSurvey/:docID" component={EditSurvey} />

          {/* <Route path="/Events" component={Events} /> */}
        </div>

      </BrowserRouter>
    );
  }
}
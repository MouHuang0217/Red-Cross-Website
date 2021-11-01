import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import { About } from "./About";

import Signup from './Signup';
import Login from './Login';
import ChangePassword from './ChangePassword';
import AdminLogin from "./AdminLogin";

import Profile from "./Profile";
import CreatePosts from "./CreatePosts";
import PrivateRoute from './PrivateRoute';

/*class to route to other components and link them to pages*/
export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div style={{ width: "100%" }}>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Signup} />
          <Route path="/ChangePassword" component={ChangePassword} />
          <Route path="/Admin" component={AdminLogin} />
          <PrivateRoute path="/Profile" component={Profile} />
          <PrivateRoute path="/CreatePosts" component={CreatePosts} />
          <PrivateRoute path="/AdminHome" component={Profile} />

          {/* <Route path="/Events" component={Events} /> */}
        </div>
      </BrowserRouter>
    );
  }
}
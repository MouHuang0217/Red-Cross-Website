import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import { About } from "./About";
import Signup from './Signup'
import Login from './Login'
import AdminLogin from './AdminLogin'

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
          <Route path="/Admin" component={AdminLogin} />

          {/* <Route path="/Events" component={Events} /> */}
        </div>
      </BrowserRouter>
    );
  }
}
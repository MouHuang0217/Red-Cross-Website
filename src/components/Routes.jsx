import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import { About } from "./About";
import Login from './Login'
import Signup from './Signup'
/*class to route to other components and link them to pages*/
export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div style={{ width: "100%" }}>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Signup" component={Signup} />

          {/* <Route path="/Events" component={Events} /> */}
        </div>
      </BrowserRouter>
    );
  }
}
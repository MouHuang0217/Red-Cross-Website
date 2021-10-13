import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import {Home} from "./Home";
import {About} from "./About";

/*class to route to other components and link them to pages*/
export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>          
        <div style={{width:"100%"}}>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
        </div>
      </BrowserRouter>
    );
  }
}
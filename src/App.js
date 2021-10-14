import logo from './logo.svg';
import './App.css';

import React, {Component, useState, useEffect } from "react";
// import { collection, getDocs } from 'firebase/firestore'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Login'
import Events from './Events'
import Signup from './components/Signup'
import { AuthProvider } from './contexts/AuthContext';
import { Container } from 'react-bootstrap'
import React, {Component} from 'react';
import Routes from './components/Routes';

//function App() {
export default class App extends Component {
  render(){
  return (

//     <Container
//       className="d-flex align-items-center justify-content-center"
//       style={{ minHeight: "100vh" }}
//     >
//       <div className="w-100">

//         <AuthProvider>
//           < div className="App" >
//             <Router>
//               <Switch>
//                 <Route exact path="/Login" component={Login} />
//                 <Route exact path="/Signup" component={Signup} />

//                 <Route path="/Events" component={Events} />
//               </Switch>
//             </Router>
//           </div >
//         </AuthProvider>
//       </div>
//     </Container>
    <div className="App">
      <Routes />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          JK Test
        </a>
      </header> */}
    </div>
  );
}
}

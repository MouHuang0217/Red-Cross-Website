import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
// import { collection, getDocs } from 'firebase/firestore'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Login'
import Events from './Events'
import Signup from './components/Signup'
import { AuthProvider } from './contexts/AuthContext';
import { Container } from 'react-bootstrap'

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100">

        <AuthProvider>
          < div className="App" >
            <Router>
              <Switch>
                <Route exact path="/Login" component={Login} />
                <Route exact path="/Signup" component={Signup} />

                <Route path="/Events" component={Events} />
              </Switch>
            </Router>
          </div >
        </AuthProvider>
      </div>
    </Container>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {About} from './components/About'

function App() {
  return (
    <div className="App">
      <React.Fragment>
      <Router>
        <Switch>
          <Route path="/about" component={About} />
        </Switch>
      </Router>
      <header className="App-header">
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
      </header>
      </React.Fragment>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Routes from './components/Routes';

//function App() {
export default class App extends Component {
  render(){
  return (
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

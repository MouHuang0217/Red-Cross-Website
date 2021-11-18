import logo from './logo.svg';
import './App.css';

import React, { Component } from "react";
// import { collection, getDocs } from 'firebase/firestore'

import { AuthProvider } from './contexts/AuthContext';
import Routes from './components/Routes';
//function App() {
export default class App extends Component {
  render() {
    return (
      // DO NOT DELETE AuthProvider! This allows all components to gain access to firebase
      <AuthProvider>
        <div className="App">
          <Routes />
          {

          }
        </div>
      </AuthProvider>
    );
  }
}

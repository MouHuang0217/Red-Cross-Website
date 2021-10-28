import logo from './logo.svg';
import './App.css';

import React, { Component, useState, useEffect } from "react";
// import { collection, getDocs } from 'firebase/firestore'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext';
import { Container } from 'react-bootstrap'
import Routes from './components/Routes';
import PrivateRoute from './components/PrivateRoute';
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

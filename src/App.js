import logo from './logo.svg';
import './App.css';

import React, { Component, useState, useEffect } from "react";
// import { collection, getDocs } from 'firebase/firestore'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext';
import { Container } from 'react-bootstrap'
import Routes from './components/Routes';

//function App() {
export default class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="App">
          <Routes />
        </div >
      </AuthProvider>
    );
  }
}

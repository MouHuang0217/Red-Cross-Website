// import React from 'react'

// export const Home = () => (
//     <React.Fragment>
//     <h2> Home Page </h2>
//     <a href="/about">About Page</a>
//     <p>If we make Home a class that extends Component, we can call other components and reduce code.
//     </p>
//     </React.Fragment>
// )
import React, { Component, useRef, useState } from 'react'
// import TextingForm from './TextingForm';
import AdminNavigation from './AdminNavagationBar';
import Posts from './Posts';
import { Alert } from 'react-bootstrap'
import ErrorMessage from './VerifyEmailError';
/*Homepage, what everyone sees when they open the website*/
export default class AdminHome extends Component {
  render() {
    return (
      <div className="formbody">
        <AdminNavigation /> {/*calling the navigation component to display*/}
        <ErrorMessage />
        <Posts /> {/*show posts from database*/}
        {/* <TextingForm /> calling the texting form component to display */}
        <center><a href="/about">About Page</a></center>
        <center><a href="/CreatePosts">Create Post</a></center>
      </div>
    );
  }
}
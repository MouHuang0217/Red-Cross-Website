// import React from 'react'

// export const Home = () => (
//     <React.Fragment>
//     <h2> Home Page </h2>
//     <a href="/about">About Page</a>
//     <p>If we make Home a class that extends Component, we can call other components and reduce code.
//     </p>
//     </React.Fragment>
// )

import React, { Component } from 'react';
// import TextingForm from './TextingForm';
import Navigation from './MainNavigation';
import Posts from './Posts';

/*Homepage, what everyone sees when they open the website*/
export default class Home extends Component {

  render() {
    return (
      <div className="formbody">
        <Navigation /> {/*calling the navigation component to display*/}
        <Posts /> {/*show posts from database*/}
        {/* <TextingForm /> calling the texting form component to display */}
        <center><a href="/about">About Page</a></center>
        <center><a href="/CreatePosts">Create Post</a></center>
      </div>
    );
  }
}
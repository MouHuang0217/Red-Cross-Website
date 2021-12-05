// import React from 'react'

// export const Home = () => (
//     <React.Fragment>
//     <h2> Home Page </h2>
//     <a href="/about">About Page</a>
//     <p>If we make Home a class that extends Component, we can call other components and reduce code.
//     </p>
//     </React.Fragment>
// )
import Footer from './Footer';

import React, { Component } from 'react'
// import TextingForm from './TextingForm';
import Navigation from './MainNavigation';
import Posts from './Posts';

import ErrorMessage from './VerifyEmailError';
/*Homepage, what everyone sees when they open the website*/

export default class Home extends Component {
  render() {
    return (
      <div className="formbody">
        <Navigation /> {/*calling the navigation component to display*/}
        <ErrorMessage />
        <Posts />
        <Footer />
        {/* <TextingForm /> calling the texting form component to display */}
      </div>
    );
  }
}
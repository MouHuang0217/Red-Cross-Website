
import React, { Component } from 'react'
import AdminNavigation from './AdminNavagationBar';
import AdminPosts from './AdminPosts';
import ErrorMessage from './VerifyEmailError';
export default class AdminHome extends Component {
  render() {
    return (
      <div className="formbody">
        <AdminNavigation /> {/*calling the navigation component to display*/}
        <ErrorMessage />
        <AdminPosts /> {/*show posts from database*/}
        {/* <TextingForm /> calling the texting form component to display */}
      </div>
    );
  }
}
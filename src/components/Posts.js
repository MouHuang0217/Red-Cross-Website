import React, { useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { fs } from "../firebase"

import { Button, Alert } from 'react-bootstrap'

import "../cardcss.scss"
import "../App.css"

export default function Posts() {
  const { currentUser } = useAuth()
  // const { getPosts } = useFirestore()
  const [posts, setPosts] = useState([]);
  const [success, setSuccess] = useState('')

  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [attendees, setAttendees] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      getData();
    }
    fetchPosts()
  }, [])
  async function getData() {
    fs.collection('events').orderBy("id", "desc").onSnapshot((snapshot) => {
      const tempTasks = [];
      snapshot.forEach(
        doc => {
          var newData = doc.data();
          newData.id = doc.id;
          // tempTasks.push(newData);
          try {
            var result = checkIfArrayContainsUser(doc.id).then((data) => {
              console.log('No error from processDataAsycn() with async( When promise gets rejected ): ' + data);
              newData.rsvp = data;

            }).catch((error) => {
              console.log('Error from processDataAsycn() with async( When promise gets rejected ): ' + error);
            });
          }
          finally {
            tempTasks.push(newData);
          }
        }
      )
      setPosts(tempTasks);
    });
  }

  async function RSVPEvent(docID, attendees) {
    if (!currentUser) {
      alert("Please log in first");
    }
    else if (currentUser.emailVerified == false) {
      alert("Please verify your email first");
    }
    else {
      if (window.confirm('Are you sure to RSVP for this event?')) {
        console.log("RSVP'd");
        const col = fs.collection('events').doc(docID);
        var query = await checkIfArrayContainsUser(docID);
        if (query == false) {
          attendees.push(currentUser.uid);
          col.update({
            attendees: attendees
          });
          // setSuccess("Successfully RSVP'd for this event");
          alert("Successfully RSVP'd for this event");
        }
        else {
          alert("You have RSVP'd for this event already");
        }
      }
      else {
        console.log("Cancelled");
      }
    }
  }

  async function checkIfArrayContainsUser(docID) {
    try {
      const data = await fs.collection("events").doc(docID).get();
      var attendees = data.data().attendees;
      for (var i = 0; i < attendees.length; i++) {
        console.log(attendees[i]);
        if (attendees[i] == currentUser.uid) {
          console.log("Exists");
          return true;
        }
      }
      console.log("DNE");
    }
    catch {
      console.log("Something went wrong");
    }
    return false;
  }

  return (
    <div>
      {success && <Alert variant="success" role="alert">
        <p>
          {success}
          <Button className="btn float-end" size="sm" onClick={() => setSuccess("")} variant="outline-success">
            x
          </Button>
        </p>

      </Alert>}
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light" ><strong>Upcoming Events</strong></h1>
            <p className="lead text-muted">Come join us and meet us at our events!</p>
          </div>
        </div>
      </section>
      <body>
        <div className="album py-5 bg-light">
          <div className="container mt-4 wr">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {posts.map(post => (
                <div className="wrapper">
                  <div id="postcards" className="card">
                    <div className="card__body ">
                      <img src={post.pic} className="card__image" />
                      <h2 className="card__title"><strong>{post.name}</strong></h2>
                      <div>
                        <p className="card__description"><strong>Description:</strong> {post.description} </p>
                        <p className="card__description"><strong>Time:</strong> {post.time}</p>
                        <p className="card__description"> <strong>Date:</strong> {post.date}</p>
                        <p className="card__description"><strong>Location:</strong> {post.location}</p>
                        {(post.link && <p className="card__description"><strong>Link:</strong> {post.link}</p>)}
                      </div>
                    </div>
                    <button className="card__btn" onClick={e => RSVPEvent(post.id, post.attendees)}>RSVP</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </body>
    </div >
  )
}
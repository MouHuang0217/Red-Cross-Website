import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { fs } from "../firebase"
import { Table } from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap';
import '../App.css';

import Popup from './Popup'

export default function AdminPosts() {
  // const { getPosts } = useFirestore()
  const [posts, setPosts] = useState([]);

  const [buttonPopup, setButtonPopup] = useState(false);
  const [attendees, setAttendees] = useState([]);
  // const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      getData();
    }
    fetchPosts()
  }, [])

  async function getData() {
    fs.collection('events').orderBy("id", "desc").onSnapshot((snapshot) => {
      const tempTasks = [];
      // const rsvpList = [];
      snapshot.forEach(
        doc => {
          var newData = doc.data();
          newData.id = doc.id;
          tempTasks.push(newData);
          console.log(tempTasks);
          // for(var attendee of doc.data().attendees){
          //   rsvpList.push(attendee);
          //   console.log("Attendee: " + attendee);
          // }
        }
      )
      setPosts(tempTasks);
    });
  }

  async function displayUsers(docID) {
    const data = await fs.collection("events").doc(docID).get();
    const data2 = await fs.collection('users').get();
    const users = data2.docs.map(doc => doc.data());
    // console.log(users);
    const array = [];
    const members = data.data()['attendees'];
    // console.log(attendees);
    for (var i = 0; i < members.length; i++) {
      // console.log("CHECKING" + attendees[i]);
      for (var j = 0; j < users.length; j++) {
        if (members[i] === users[j]['uid']) {
          array.push(users[j]['firstName'] + " " + users[j]['lastName']);
          console.log("NAME FOR " + members[i] + " is " + users[j]['firstName']);
        }
      }
    }
    // console.log(array);
    // console.log(members);
    setAttendees(array);
    console.log(attendees);
    setButtonPopup(true);
  }

  async function deleteData(docID) {
    console.log(docID);
    if (window.confirm('Are you sure to delete this event?')) {
      fs.collection("events").doc(docID).delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }

  }

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light" >Upcoming Events</h1>
            <p className="lead text-muted">Come join us and meet us at our events!</p>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container mt-4">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {posts.map(post => (
              <div className="card">
                <div className="card">
                  <div className="card__body">
                    <img src={post.pic} className="card__image" />
                    <h2 className="card__title">{post.name}</h2>
                    <div>
                      <p className="card__description">Description: {post.description} </p>
                      <p className="card__description"> Time: {post.time}</p>
                      <p className="card__description"> Date: {post.date}</p>
                      <p className="card__description">Location: {post.location}</p>
                    </div>
                  </div>
                  <Button variant="light" className="card__edit__btn" onClick={() => displayUsers(post.id)}>Show Attendees</Button>
                  {/* <Button variant="light" className="card__btn" onClick={() => setButtonPopup(true)}>Show Attendees</Button> */}
                  <LinkContainer to={`/EditEvent/${post.id}`}>
                    <Button type="button" className="btn blue  card__edit__btn">Edit</Button>
                  </LinkContainer>

                  <Button variant="danger" type="button" className="card__edit__btn" onClick={() => deleteData(post.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* {trigger ? (
                          <div className="popup">
                          <div className="popup-inner">
                            <button className="close-btn" onClick={() => setTrigger(!trigger)}>Close</button>
                            <ol id="attendeeList">
                            {attendees.map(attendee => (
                              <li>{attendee}</li>
                            ))}
                          </ol>
                          </div>
                        </div>
            ) : "" } */}

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        {/* <div>
                  <h3>Who's Going</h3>
                  <ol id="attendeeList">
                    {attendees.map(attendee => (
                      <li>{attendee}</li>
                    ))}
                  </ol>
                </div> */
        }
        <Table striped bordered hover>
          <thead>
            <div>
              <h3>Who's Going</h3>
            </div>
          </thead>
          <tbody>
            <ol id="attendeeList">
              {attendees.map(attendee => (
                <div>
                  <li>{attendee}</li>
                </div>
              ))}
            </ol>
          </tbody>
        </Table>
      </Popup>
    </div>
  )
}
//<Button variant="primary">Edit</Button>

//<Button variant="danger" onClick={e => deleteData(post.id)}>Delete</Button>
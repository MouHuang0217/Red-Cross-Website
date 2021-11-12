import React, { Component, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Logo from "../arc_logo.png";
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
// import { useFirestore } from '../contexts/FireStoreContext'
import { fs } from "../firebase"
//import { collection, getDocs } from 'firebase/firestore'

import ProfilePic from '../profileDefaultPic.png';
import { Card, Form, Container, Alert } from 'react-bootstrap'
import App from "./ListEvents";
import { LinkContainer } from 'react-router-bootstrap';
import '../App.css';


export default function AdminPosts() {
  const { currentUser } = useAuth()
  // const { getPosts } = useFirestore()
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const history = useHistory()

  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

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
          tempTasks.push(newData);
        }
      )
      setPosts(tempTasks);
    });
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
                    <img src={post.pic} class="card__image" />
                    <h2 className="card__title">{post.name}</h2>
                    <div>
                      <p className="card__description">Description: {post.description} </p>
                      <p className="card__description"> Time: {post.time}</p>
                      <p className="card__description"> Date: {post.date}</p>
                      <p className="card__description">Location: {post.location}</p>
                    </div>
                  </div>
                  <LinkContainer to={`/EditEvent/${post.id}`}>
                    <Button type="button" className="btn blue  card__edit__btn">Edit</Button>
                  </LinkContainer>
                  <Button variant="danger" type="button" className="card__edit__btn" onClick={e => deleteData(post.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
//<Button variant="primary">Edit</Button>

//<Button variant="danger" onClick={e => deleteData(post.id)}>Delete</Button>
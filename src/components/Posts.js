import React, { Component, useState, useEffect } from "react";
import { Table, Navbar, NavItem, Button } from "react-bootstrap";
import Logo from "../arc_logo.png";
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
// import { useFirestore } from '../contexts/FireStoreContext'
import { fs } from "../firebase"
//import { collection, getDocs } from 'firebase/firestore'
import ProfilePic from '../profileDefaultPic.png';

import { Card, Form, Container, Alert } from 'react-bootstrap'
import App from "./ListEvents";

import "../cardcss.scss"
import "../App.css"

export default function Posts() {
  const { currentUser } = useAuth()
  // const { getPosts } = useFirestore()
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const history = useHistory()

  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  //const postsCollectionRef = collection(fs, "posts")

  // useEffect(() => {
  //   const getPosts = async () => {
  //     // const data = await getDocs(postsCollectionRef);
  //     // //const data = postsCollectionRef.get()
  //     // console.log(data);
  //     const data = await fs.collection("posts").get()
  //     const data2 = data.docs.map(doc => doc.data());
  //     for(var i = 0; i < data.size; i++) {

  //     }
  //     fs.collection("posts").get()
  //     .then(function(querySnapshot){
  //       querySnapshot.forEach(function(doc) {
  //         setPosts({
  //           name : doc.data().name,
  //           dates : doc.data().dates
  //         })
  //       })
  //     })

  //     // setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //   }
  //   getPosts()
  //   console.log(posts)
  // }, [])

  // async function showPosts(e) {
  //       e.preventDefault()

  //       try {
  //           setError("")
  //           setLoading(true)
  //           // setPosts(getPosts())
  //           const postsCollectionRef = collection(fs, "posts")
  //           const postSnapshot = getDocs(postsCollectionRef)
  //           const postList = postSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //           setPosts(postList)
  //       } catch {
  //           setError("Failed to Show Posts")
  //       }

  //       setLoading(false)
  //   }

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await fs.collection("events").orderBy("id", "desc").get();
      setPosts(data.docs.map(doc => doc.data()))
      console.log(posts);
    }
    fetchPosts()
  }, [])
  //   console.log(data);
  //   // setPosts(data.docs.map(doc => doc.data()));
  // }
  // fetchPosts()

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const db = firebase.firestore()
  //     const data = await db.collection("users").get()
  //     setSpells(data.docs.map(doc => doc.data()))
  //   }
  //   fetchData()
  // }, [])

  // fs.collection("events").get()
  //   .then(function(querySnapshot)
  //     {querySnapshot.forEach(function(doc) {
  //     //doc.data() is never undefined for query doc snapshots
  //     var list = document.createElement("ul");

  //     var name = document.createElement("li");
  //     var nameCell = document.createTextNode(doc.data().name);
  //     name.appendChild(nameCell);

  //     var date = document.createElement("li");
  //     var dateCell = document.createTextNode(doc.data().date);
  //     date.appendChild(dateCell);

  //     var type = document.createElement("li");
  //     var typeCell = document.createTextNode(doc.data().type);
  //     type.appendChild(typeCell);

  //     var pic = document.createElement("li"); //refactor
  //     var img = document.createElement("img"); //refactor
  //     img.src = doc.data().pic; //refactor
  //     pic.appendChild(img); //refactor

  //     list.appendChild(name);
  //     list.appendChild(date);
  //     list.appendChild(type);
  //     list.appendChild(pic); //refactor
  //     document.getElementById("postsList").appendChild(list);
  //   })
  // })
  //  })
  // }), [])

  //   return (
  //     <div className="card">
  //       <div className="card">
  //         <div className="card__body">
  //           <img src="" class="card__image" />
  //           <h2 className="card__title">asdasdasd</h2>
  //           <p className="card__description">asdsadasd</p>
  //         </div>
  //         <button className="card__btn">View Recipe</button>
  //       </div>
  //     </div>
  //   )

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light" ><strong>Upcoming Events</strong></h1>
            <p className="lead text-muted">Come join us and meet us at our events!</p>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container mt-4 wr">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {posts.map(post => (
              <div className="wrapper">
                <div className="card">
                  <div className="card__body ">
                    <img src={post.pic} className="card__image" />
                    <h2 className="card__title"><strong>{post.name}</strong></h2>
                    <div>
                      <p className="card__description"><strong>Description:</strong> {post.description} </p>
                      <p className="card__description"><strong>Time:</strong> {post.time}</p>
                      <p className="card__description"> <strong>Date:</strong> {post.date}</p>
                      <p className="card__description"><strong>Location:</strong> {post.location}</p>
                      <p className="card__description"><strong>Link:</strong> {post.link}</p>

                    </div>
                  </div>
                  <button className="card__btn">RSVP</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
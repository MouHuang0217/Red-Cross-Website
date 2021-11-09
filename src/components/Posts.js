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
      const data = await fs.collection("events").get();
      setPosts(data.docs.map(doc => doc.data()))
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

  return (
    <div>
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">Upcoming Events</h1>
            <p class="lead text-muted">Come join us and meet us at our events!</p>
          </div>
        </div>
      </section>

      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {posts.map(post => (
              <div>
                <div class="col">
                  <Card key={post.name} style={{ width: '16rem', margin: 'auto' }}>
                    <Card.Img variant="top" src={post.pic} />
                    <Card.Body style={{ margin: 'auto' }}>
                      <Card.Title>{post.name}</Card.Title>
                      <Card.Text>Date: {post.date}</Card.Text>
                      <Card.Text>Description: {post.description}</Card.Text>
                      <Card.Text>Time: {post.time}</Card.Text>
                      <Card.Text>Link: {post.link}</Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* can do background image overlay */}
      {/* <Card style={{ width: '16rem', margin: 'auto'}}>
          <Card.Img variant="top" src={ProfilePic} style={{width: '10rem', margin: 'auto' }}/>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Date: 11/1/21
            </Card.Text>
            <Card.Text>
              Type: Some more text
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card> */}

      {/* <Card className="bg-dark text-white" style={{ margin: 'auto'}}>
          <Card.Img src={ProfilePic} alt="Post Image" style={{width: '10rem', margin: 'auto' }}/>
          <Card.ImgOverlay>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.
            </Card.Text>
            <Card.Text>Last updated 3 mins ago</Card.Text>
          </Card.ImgOverlay>
        </Card> */}

      {/* <Table striped bordered hover>
      
          <thead>
            <div>
              <h1>Posts List</h1>
            </div>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Type</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
          {posts.map(post => (
                
                <tr key={post.name}>
                      <td>{post.name}</td>
                      <td>{post.date}</td>
                      <td>{post.type}</td>
                      <td><img src={post.pic} style={{width: "30%", height: "30%", margin: "auto"}} /></td>
                    </tr>
              ))}
          </tbody>
      </Table> */}
      {/* {
          posts.map(post => (
            <li key = {post.name}>{post.name}</li>
          ))
        } */}
      {/* <Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Date</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    {
      posts.map(post => (
        <tr key = {post.name}>
          <td>{post.name}</td>
          <td>{post.date}</td>
          <td>{post.type}</td>
        </tr>        
      ))
    }

  </tbody>
</Table> */}

      {/* {posts !== [] ? (
        <div>
          {posts.map((post) => {
            return <div>
              <h1>Name: {post.name}</h1>
              <h1>Dates: {post.dates}</h1>
            </div>
          })}
        </div>

        ) : (
        <Button disabled={loading} className="w-100" type="submit" onClick={showPosts}>
          Show Posts
        </Button>
        )} */}


      {/* </div> */}
    </div >


  )
}
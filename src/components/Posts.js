import React, { Component, useState, useEffect } from "react";
import { Table, Navbar, NavItem, Button } from "react-bootstrap";
import Logo from "../arc_logo.png";
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

// import { useFirestore } from '../contexts/FireStoreContext'
import { fs } from "../firebase"
//import { collection, getDocs } from 'firebase/firestore'

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
    // const fetchPosts = async => {
    //   const data = fs.collection("events").get();
    //   console.log(data);
    //   // setPosts(data.docs.map(doc => doc.data()));
    // }
    // fetchPosts()
    
    fs.collection("events").get()
      .then(function(querySnapshot)
        {querySnapshot.forEach(function(doc) {
        //doc.data() is never undefined for query doc snapshots
        var list = document.createElement("ul");
      
        var name = document.createElement("li");
        var nameCell = document.createTextNode(doc.data().name);
        name.appendChild(nameCell);

        var date = document.createElement("li");
        var dateCell = document.createTextNode(doc.data().date);
        date.appendChild(dateCell);

        var type = document.createElement("li");
        var typeCell = document.createTextNode(doc.data().type);
        type.appendChild(typeCell);

        var pic = document.createElement("li"); //refactor
        var img = document.createElement("img"); //refactor
        img.src = doc.data().pic; //refactor
        pic.appendChild(img); //refactor

        list.appendChild(name);
        list.appendChild(date);
        list.appendChild(type);
        list.appendChild(pic); //refactor
        document.getElementById("postsList").appendChild(list);
      })
    })
  })
  // }), [])

  return (
    <div>
      {(currentUser && <div>{currentUser.email}</div>)}
      {/* <div> */}
        {/* <Button disabled={loading} className="w-20" type="submit" onClick={showPosts}>
          Show Posts
      </Button> */}
        <div id="postsList">
        </div>
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
    </div>


  )
}
import { database } from 'firebase'
import React from 'react'
import firebase from "../firebase"
import { Table } from 'react-bootstrap'
import AdminNavigation from './AdminNavagationBar';

function App() {
  const [spells, setSpells] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection("users").get()
      setSpells(data.docs.map(doc => doc.data()))
    }
    fetchData()
  }, [])

  return (
    <div className="formbody">
      <AdminNavigation /> {/*calling the navigation component to display*/}
      <Table striped bordered hover>

        <thead>

          <div>
            <h1>ListofEmails</h1>
          </div>
          <tr>
            {/* <th>#</th> */}
            <th>First Name</th>
            <th>Email</th>
            {/* <th>Username</th> */}
          </tr>
        </thead>
        <tbody>
          {spells.map(spell => (

            <tr key={spell.uid}>
              <td>{spell.firstName}</td>
              <td>{spell.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

  );
}
export default App;




























// const Test = () => {
//   const [loading, setLoading] = useState(true);
//   const [posts, setPosts] = useState([]);
//   useEffect(() => {
//     const getPostsFromFirebase = [];
//     const fs = db.collection("users").onSnapshot((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         getPostsFromFirebase.push( {
//           ...doc.data(),
//           key: doc.id,
//         });

//       });
//       setPosts(getPostsFromFirebase);
//       setLoading(false)
//     });
//     return () => fs();

//   },[]);
//   if (loading) {
//     return <h1> loading firebase data</h1>
//   }
//   return (
//     <div>
//       <h1> Answers.:</h1>
//         {posts.length > 0 ? (
//           posts.map((post) => <div key = {post.key}>post.isAdmin</div>)
//         ) : <h1> no posts yet</h1> }
//     </div>
//   )

// }

// export default Test;

























// import React, { useState, useEffect } from 'react';

// import { fs } from "../firebase"

// const firebaseConfig = {
//   apiKey: "AIzaSyDQXMsyejsUgPj-1ZPIyL9YMKdhZ280Mwo",
//   authDomain: "cinema-schedule-7bfa4.firebaseapp.com",
//   databaseURL: "https://cinema-schedule-7bfa4.firebaseio.com",
//   projectId: "cinema-schedule-7bfa4",
//   storageBucket: "cinema-schedule-7bfa4.appspot.com",
//   messagingSenderId: "215540682675",
//   appId: "1:215540682675:web:6e6e792cb9f041ae8e05c6"
// };

// // Initialize Firebase
// // fs.initializeApp(firebaseConfig);
// // const database = fs.firestore();

// const App = () => {
//   const [cinemas, setCinemas] = useState([]);
//   const [selectedCinema, setSelectedCinema] = useState();
//   const [movies, setMovies] = useState([]);
//   const [error, setError] = useState();

//   const selectCinema = (cinema) => {
//     setSelectedCinema(cinema);
//     fs.collection('cinemas').doc(cinema.id).collection('movies').get()
//       .then(response => {
//         const fetchedMovies = [];
//         response.forEach(document => {
//           const fetchedMovie = {
//             id: document.id,
//             ...document.data()
//           };
//           fetchedMovies.push(fetchedMovie);
//         });
//         setMovies(fetchedMovies);
//       })
//       .catch(error => {
//         setError(error);
//       });
//   }

//   const timestampToString = (timestamp) => {
//     return Date(timestamp).toString();
//   }

//   useEffect(() => {
//     fs.collection('cinemas').get()
//       .then(response => {
//         const fetchedCinemas = [];
//         response.docs.forEach(document => {
//           const fetchedCinema = {
//             id: document.id,
//             ...document.data()
//           };
//           fetchedCinemas.push(fetchedCinema);
//         });
//         setCinemas(fetchedCinemas);
//       })
//       .catch(error => {
//         setError(error);
//       });
//   }, []);

//   return (
//     <div>
//       {error ? (
//         <p>Ops, there is an error :(</p>
//       ) : null}
//       <ul>
//         {cinemas.map(cinema => (
//           <li key={cinema.id} onClick={() => selectCinema(cinema)}>
//             <b>{cinema.name}</b> in {cinema.city} has {cinema.total_seats} total seats
//           </li>
//         ))}
//       </ul>
//       {selectedCinema ? (
//         <ul>
//           {movies.map(movie => (
//             <li key={movie.id}>
//               <b>{movie.name}</b> | {movie.genre} | {movie.runtime} | {timestampToString(movie.release_date)}
//             </li>
//           ))}
//         </ul>
//       ) : null}
//     </div>
//   );
// }

// export default App;


































































// // Import Firestore database
// import { fs } from "../firebase"
// // import { useState } from 'react';
// import './read.css';

// const Read = () => {

//     const [info , setInfo] = useState([]);

//     // Start the fetch operation as soon as
//     // the page loads
//     window.addEventListener('load', () => {
//         Fetchdata();
//       });

//     // Fetch the required data using the get() method
//     const Fetchdata = ()=>{
//         fs.collection("data").get().then((querySnapshot) => {

//             // Loop through the data and store
//             // it in array to display
//             querySnapshot.forEach(element => {
//                 var data = element.data();
//                 setInfo(arr => [...arr , data]);

//             });
//         })
//     }

//     // Display the result on the page
//     return (
//         <div>
//             <center>
//             <h2>Student Details</h2>
//             </center>

//         {
//             info.map((data) => (
//               course = {data.courseEnrolled}
//               name = {data.Nane}
//               age = {data.Age}
//               console.log(course + " " + name + " " + age)
//             ))
//         }
//         </div>

//     );
// }

// // Define how each display entry will be structured
// const Frame = ({course , name , age}) => {
//     console.log(course + " " + name + " " + age);
//     return (
//         <center>
//             <div className="div">

// <p>NAME : {name}</p>


// <p>Age : {age}</p>


// <p>Course : {course}</p>

//             </div>
//         </center>
//     );
// }

// export default Read;











































































// import React, { Component, useState, useEffect, setInfo, info, Frame} from "react";
// // import {fs,auth} from 'Red-Cross-Website/src/firebase.js'
// import { fs } from "../firebase";
// // import { useState } from 'react';
// // import './read.css';
// // import TextingForm from './TextingForm';
// import Navigation from './MainNavigation';
// import Posts from './Posts';
// import { useAuth } from '../contexts/AuthContext'
// import { Link, useHistory } from 'react-router-dom'

// const ListEmails = () => {
//   const[loading, setLoading] = useState(true);
//   const[posts, setPosts] = useState([]);
//   useEffect(() => {
//     const getEmailsFromFirestore = [];
//     const emails = fs.collection("users").onSnapshot()
//   })
//   return {

//   };

// };

// export default ListEmails;











// import { useFirestore } from '../contexts/FireStoreContext'
// import { fs, auth } from "../firebase"
// function ListEmails() {

//   var data;
//   // const arr = [];
//   const [info , setInfo] = useState([]);

//   // // Start the fetch operation as soon as
//   // // the page loads
//   // window.addEventListener('load', () => {
//   //     Fetchdata();
//   //   });

//   // Fetch the required data using the get() method
//   // getUsers() {
//       fs.collection("users").get().then((querySnapshot) => {
//         // let docs = querySnapshot.docs;
//           // Loop through the data and store
//           // it in array to display
//           // querySnapshot.forEach(element => {
//           //     var data = element.data();
//           //     // setInfo(arr => [...arr , data]);
//           //     const listItems = numbers.map((data) =>
//           //       <li>{number}</li>
//           //     );

//           // });
//           //doc.data() is never undefined for query doc snapshots
//         const documents = querySnapshot.docs.map(doc => doc.data())
//         var list = documents.createElement("ul");


//       });


//   // }

//   // Display the result on the page
//   return (
//       <div>
//           <center>
//           <h2>Student Details</h2>
//           {/* <h1>{arr.map()}</h1> */}
//           </center>

//       {
//           // info.map((data) => (
//           // <Frame email={data.email} 
//           //        name={data.name} />
//           // ))


//       }
//       </div>

//   );
// };

// // Define how each display entry will be structured
// // const Frame = ({email , name}) => {
// //   console.log(email + " " + name);
// //   return (
// //       <center>
// //           <div className="div">

// // <p>NAME : {name}</p>


// // {/* <p>Age : {age}</p> */}


// // <p>Email : {email}</p>

// //           </div>
// //       </center>
// //   );
// // }

// export default ListEmails;


























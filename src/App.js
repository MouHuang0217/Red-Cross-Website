import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore'
function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users")
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers()
    console.log(users)
  }, [])
  return (

    < div className="App" >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React-Mou
        </a>
        <div>
          {users.map((user) => {
            return <div>
              <h1>Name: {user.name}</h1>
              <h1>Name: {user.age}</h1>
            </div>
          })}
        </div>
      </header>
    </div >
  );
}

export default App;

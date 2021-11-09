import { database } from 'firebase'
import React from 'react'
import firebase from "../firebase"
import { Table } from 'react-bootstrap'
import AdminNavigation from './AdminNavagationBar';
import { Button, RadioButton } from 'react-bootstrap'

function App() {
    const [events, setEvents] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection("events").get()
            // setEvents(data.docs.map(doc => doc.data()))
            setEvents(data.docs.map(doc => { return { ...doc.data(), id: doc.id } }));
        }
        fetchData()
    }, [])

    return (
        <div className="formbody">
            <Table striped bordered hover >
                <thead variant="dark">

                    <div>
                        <h1>List Of Events</h1>
                    </div>
                    <tr>
                        {/* <th>#</th> */}
                        <th>ID</th>
                        <th>Event Name</th>
                        <th>Time</th>
                        <th>Location</th>

                        {/* <th>Username</th> */}
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event.id}>
                            <td>{event.id}</td>

                            <td>{event.name}</td>
                            <td>{event.time}</td>
                            <td>{event.location}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>

    );
}
export default App;
import React from 'react'
import firebase from "../firebase"
import { Table } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

function ListEvents() {
    const [events, setEvents] = React.useState([])
    const { currentUser } = useAuth()
    const db = firebase.firestore()

    React.useEffect(() => {
        const fetchData = async () => {
            // const data = await db.collection("events").get()
            // // setEvents(data.docs.map(doc => doc.data()))
            // setEvents(data.docs.map(doc => { return { ...doc.data(), id: doc.id } }));
            var posts = [
            ];
            db.collection("events").get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        // console.log(doc.data().attendees);
                        var attendees = doc.data().attendees;
                        if (attendees) {
                            for (var i = 0; i < attendees.length; i++) {
                                // console.log(attendees[i]);
                                if (attendees[i] == currentUser.uid) {
                                    console.log("SAME USER");
                                    // console.log("DOCID" +  doc.id);
                                    console.log(doc.data());
                                    var name = doc.data().name;
                                    var location = doc.data().location;
                                    var date = doc.data().date;
                                    var time = doc.data().time;

                                    posts.push({
                                        name: name,
                                        location: location,
                                        date: date,
                                        time: time
                                    });
                                    setEvents(posts);
                                    // const data = doc.docs.map(doc => doc.data())
                                    // const name = doc.data().name;
                                }
                            }
                        }

                    })
                })
            setEvents(posts);
        }
        fetchData()
    }, [])

    return (
        <div className="formbody">
            <Table striped bordered hover >
                <thead variant="dark">

                    <div>
                        <h1>List Of RSVP'd Events</h1>
                    </div>
                    <tr>
                        {/* <th>#</th> */}
                        <th>Event Name</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Time</th>

                        {/* <th>Username</th> */}
                    </tr>
                </thead>

                <tbody>
                    {events.map(event => (
                        <tr key={event.id}>
                            <td>{event.name}</td>
                            <td>{event.location}</td>
                            <td>{event.date}</td>
                            <td>{event.time}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>

    );
}
export default ListEvents;
import React, { useState, useEffect } from "react";
import { fs } from "../firebase"
import Navigation from './MainNavigation';
import { Table, Button, Alert } from 'react-bootstrap'

import "../cardcss.scss"
import "../App.css"
import Footer from './Footer';

export default function Surveys() {
    // const { getPosts } = useFirestore()
    const [surveys, setSurveys] = useState([]);
    const [success, setSuccess] = useState('')

    useEffect(() => {
        const fetchPosts = async () => {
            getData();
        }
        fetchPosts()
    }, [])
    async function getData() {
        fs.collection('surveys').orderBy("ID", "desc").onSnapshot((snapshot) => {
            const tempTasks = [];
            snapshot.forEach(
                doc => {
                    var newData = doc.data();
                    newData.id = doc.id;
                    tempTasks.push(newData);
                    console.log(newData);
                }
            )
            setSurveys(tempTasks);
            console.log(surveys);
        });
    }

    return (
        <div>
            <Navigation></Navigation>
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
                        <h1 className="fw-light" ><strong>Surveys</strong></h1>
                        <p className="lead text-muted">Please fill out these surveys if you'd like!!</p>
                    </div>
                </div>
            </section>
            <body>
                <div className="album py-5 bg-light">
                    <div className="container mt-4 wr">
                        <Table striped bordered hover>
                            <thead>
                                <div>
                                    <h1>Surveys</h1>
                                </div>
                                <tr>
                                    {/* <th>#</th> */}
                                    <th>Survey Name</th>
                                    <th>URL</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>

                                    {/* <th>Username</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {surveys.map(survey => (
                                    <tr key={survey.id}>
                                        <td>{survey.name}</td>
                                        <td><a href={survey.url}> {survey.url} </a></td>
                                        <td >{survey.dateStarted}</td>
                                        <td >{survey.dateEnded} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </body>
            <Footer></Footer>
        </div >
    )
}
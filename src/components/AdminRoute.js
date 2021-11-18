import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import React, { useState, useEffect } from "react";
import { fs } from "../firebase"

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()
    const [isAdmin, setIsAdmin] = useState(true);

    useEffect(() => {
        const checkIfAdmin = async () => {
            if (currentUser) {
                const data = await fs.collection("users").get()
                const data2 = data.docs.map(doc => doc.data());
                for (var i = 0; i < data.size; i++) {
                    var uid = data2[i]['uid'];
                    if (uid == currentUser.uid) {
                        if (data2[i]["isAdmin"] == true) {
                            console.log(uid + " is Admin");
                            setIsAdmin(true);
                            return true;
                        }
                    }
                }
                setIsAdmin(false)
                return false;
            }
        }
        checkIfAdmin()
    }, [])


    return (
        <Route
            {...rest}
            render={props => {
                return isAdmin && currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}
        ></Route>
    )
}
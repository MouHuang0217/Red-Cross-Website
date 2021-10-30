import firebase from 'firebase'
import React, { useContext, useState, useEffect } from 'react'
import { auth } from "../firebase"

const AuthContext = React.createContext()
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    //signup
    function signup(email, password) {
        console.log("in signup");
        return auth.createUserWithEmailAndPassword(email, password);
    }
    //send email
    function sendVerificationEmail() {
        console.log("in verification")
        return auth.currentUser.sendEmailVerification();
    }
    //login
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function isVerified() {
        console.log(auth.currentUser.isVerified());
    }
    //logout
    function logout() {
        return auth.signOut();
    }
    function getUID() {
        return auth.getUID();
    }
    function signInWithGoogle() {
        var google_provider = new firebase.auth.GoogleAuthProvider();
        console.log(google_provider);
        auth.signInWithPopup(google_provider)
            .then((re) => {
                console.log(re);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //change password
    function changePassword(email) {
        console.log("in changePassword");
        return auth.sendPasswordResetEmail(email);
    }


    //what happens when first initialized
    useEffect(() => {
        //firebase sets local storage/tokens for you need setLoading
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        signInWithGoogle,
        sendVerificationEmail,
        getUID,
        changePassword,
        isVerified
    }
    //export all the values and do not load children if loading is not done.
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


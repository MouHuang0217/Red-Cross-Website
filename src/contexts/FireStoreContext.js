import firebase from 'firebase'
import React, { useContext, useState, useEffect } from 'react'
import { fs } from "../firebase"
import firestore from 'firebase';

const FSContext = React.createContext()
export function useFirestore() {
    return useContext(FSContext)
}

export function FSProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function getPosts() {
        const postSnapshot = fs.collection("posts").get()
        const postList = postSnapshot.docs.map(doc => doc.data());
        // const postsCol = collection(fs, 'posts');
        // const postSnapshot = getDocs(postsCol);
        // const postList = postSnapshot.docs.map(doc => doc.data());
        return postList;
    }

    // //send email
    // function sendVerificationEmail() {
    //     console.log("in verification")
    //     return auth.currentUser.sendEmailVerification();
    // }
    // //login
    // function login(email, password) {
    //     return auth.signInWithEmailAndPassword(email, password)
    // }
    // //logout
    // function logout() {
    //     return auth.signOut();
    // }
    // function getUID() {
    //     return auth.getUID();
    // }
    // function signInWithGoogle() {
    //     var google_provider = new firebase.auth.GoogleAuthProvider();
    //     console.log(google_provider);
    //     auth.signInWithPopup(google_provider)
    //         .then((re) => {
    //             console.log(re);
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    // //change password
    // function changePassword(email) {
    //     console.log("in changePassword");
    //     return auth.sendPasswordResetEmail(email);
    // }


    // //what happens when first initialized
    // useEffect(() => {
    //     //firebase sets local storage/tokens for you need setLoading
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         setCurrentUser(user)
    //         setLoading(false)
    //     })
    //     return unsubscribe
    // }, [])

    const value = {
        currentUser,
        getPosts
    }
    //export all the values and do not load children if loading is not done.
    return (
        <FSContext.Provider value={value}>
            {!loading && children}
        </FSContext.Provider>
    )
}
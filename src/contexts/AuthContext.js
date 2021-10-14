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
    //login
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    //logout
    function logout() {
        return auth.signOut();
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
        logout
    }
    //export all the values and do not load children if loading is not done.
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


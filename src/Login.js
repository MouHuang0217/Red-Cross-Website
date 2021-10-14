import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import fire from "./firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithRedirect } from "firebase/auth";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const history = useHistory();
    const SignInWithGoogle = () => {
        var provider = new fire.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        fire.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
        });
    }
    const handleLogin = () => {
        fire.auth().signInWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                        console.log("in handleLogin");
                }
            })
    }
    return (
        <div className="login">
            <div className="login__container">
                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="login__btn"
                    onClick={() => SignInWithGoogle(email, password)}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
export default Login;

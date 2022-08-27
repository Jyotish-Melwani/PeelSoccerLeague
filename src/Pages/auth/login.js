import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.scss"
import Cookie from 'js-cookie'

const LoginScreen = () => {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        setError("")
        setSuccess("")
        axios.post('http://localhost:5000/api/user-login', { email, password })
            .then((_response) => {
                setSuccess(_response?.data?.message)
                Cookie.set('userInfo', JSON.stringify(_response?.data?.user));
                history.push('/');
            })
            .catch((err) => {
                setError(err?.response?.data?.message)
            });
    }

    return <>

        <div class="container">
            <div class="form">
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                <p style={{ color: "blue", textAlign: "center" }}>{success}</p>

                <form action="#" class="login-form" onSubmit={onSubmit}>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email" />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password" />
                    <button type="submit" class="btn" style={{ cursor: "pointer" }} >Login</button>
                    <div style={{ backgroundColor: "#FF5722", paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px", textAlign: "center", marginTop: "5px" }}>
                        <Link to={`/`} style={{ color: "white", textDecoration: "none", }} >
                            Cancel
                        </Link>
                    </div>
                    <p class="message">New User? <Link to="/signup">Create an account</Link></p>
                </form>

            </div>
        </div>
    </>
}

export default LoginScreen
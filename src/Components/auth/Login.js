import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {Link, Redirect} from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";
import {Form} from "react-bootstrap";


function Login({auth, setAuth}) {

    // const onSubmit = data => console.log(data);
    const [data, setData] = useState({})
    const form = useRef(null)


    async function facebook(){
        try {
            let data = await axios.get("/auth/facebook/callback")
            console.log(data)
            // return <Redirect to="/auth/linkedin/callback" />
            // localStorage.setItem("token", token)
            // setAuth(true)

        } catch (e) {
            console.log(e)
            alert('try again!')
        }
    }






    async function submitForm(e) {
        e.preventDefault()
        try {
            let {data: {token}} = await axios.post("/auth/login", data)
            console.log(token)
            localStorage.setItem("token", token)
            setAuth(true)

        } catch (e) {
            console.log(e)
            alert('try again!')
        }
    }

    function change(e) {
        setData(prevState => ({...prevState, [e.target.name]: e.target.value}))
        console.log(data)
    }

    if(auth){
        return < Redirect to="/dashboard" />
    }



    return (
        <div>
            <div className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}>
                <div className={styles.loginFormContainer}>

                    <fieldset className="border p-3 rounded">
                        <legend
                            className={`${styles.loginFormLegend} border rounded p-1 text-center`}
                        >
                            Login Form
                        </legend>
                        <Form ref={form} onSubmit={submitForm} method="post">
                            <div className="form-group">
                                <label htmlFor="inputForEmail">Email address</label>
                                <span className="mandatory">*</span>
                                <input onChange={change}
                                       type="email"
                                       name="email"
                                       className="form-control"
                                       aria-describedby="Enter email address"
                                       placeholder="Enter email address"
                                       required="true"
                                       minLength={6}
                                />

                            </div>
                            <div className="form-group">
                                <label htmlFor="inputForPassword">Password</label>
                                <span className="mandatory">*</span>

                                <input onChange={change}
                                       type="password"
                                       name="password"
                                       className="form-control"
                                       id="inputForPassword"
                                       placeholder="Enter password"
                                       required="true"
                                       minLength={6}
                                />

                            </div>
                            <div className=" align-items-center">
                                <button type="submit" className="btn border-dark text-center mx-2">
                                    Login
                                </button>

                                <button className="btn border-dark text-center mx-2">
                                    <Link to="/register">New User</Link>
                                </button>
                            </div>
                        </Form>
                        <a href='http://localhost:8000/auth/linkedin/callback' > Login with LinkedIn</a>
                        <a href='http://localhost:8000/auth/facebook/callback' > Login with Facebook</a>
                    </fieldset>

                    <button onClick={facebook} className="btn border-dark text-center mx-2">
                        Login with Facebook
                    </button>
                </div>
            </div>



        </div>
    );
}

export default Login

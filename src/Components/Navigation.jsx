import React, {useEffect, useState} from 'react';
import {Nav, Navbar, Form} from "react-bootstrap";
import {NavLink, Redirect} from 'react-router-dom';
import axios from "axios";

function Navigation({setAuth, setUser, user}) {

    // const [auth, setAuth] = useState({})
    // const [user, setUser] = useState({})
    //
    // useEffect(() => {
    //     async function setUserStats() {
    //         try {
    //             let {data} = await axios.get("/auth/user", {
    //                 headers: {
    //                     authorization: `Bearer ${localStorage.token}`
    //                 }
    //             })
    //             setAuth(true)
    //             setUser(data.user)
    //
    //         } catch (e) {
    //             setAuth(false)
    //             setUser({})
    //             localStorage.removeItem("token")
    //         }
    //     }
    //
    //     setUserStats()
    // }, [])


     function logout(e) {
        e.preventDefault()
        setAuth(false)
        setUser(null)
        localStorage.removeItem("token")
    }



    return (
        <Navbar bg="light" expand="lg" className="p-0 pl-2">
            <Navbar.Brand href="/">Pitch Please!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/*<Form className="d-flex" action="/">*/}
                    {/*    <Form.Control name="search" />*/}
                    {/*    <button type="submit">find</button>*/}
                    {/*</Form>*/}

                </Nav>

                <Nav className="ml-auto">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/" className="nav-link"> About</NavLink>
                </Nav>
                {/*{user ? <>*/}
                    <NavLink to="/dashboard" className="nav-link">My Page</NavLink>
                    <NavLink to="/login" onClick={logout} className="nav-link">Logout</NavLink>
                {/*</> :<>*/}
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                    <NavLink to="/register" className="nav-link">Register</NavLink>
                {/*</> }*/}


            </Navbar.Collapse>
            <Nav className="bg-danger align-self-end">
                <Nav.Link href="#" className="text-white">pitchmebabyonemoretime</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Navigation;

import React, {useEffect, useState} from 'react';
import {Nav, Navbar, Form} from "react-bootstrap";
import {NavLink, Redirect} from 'react-router-dom';


function Navigation({setAuth, setUser, user}) {


    function logout(e) {
        e.preventDefault()
        setAuth(false)
        setUser(null)
        localStorage.removeItem("token")
    }

    return (

<!--         <Navbar bg="transparent" expand="lg" className="text-center w-100">
            <h3 className="px-4">Pitch Please!</h3>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="ml-auto">
                    <NavLink to="/" className="navButton font-monospace nav-link">Home</NavLink>
                    <NavLink to="/" className="navButton font-monospace nav-link"> About</NavLink>
                </Nav>
<!--                 {user ? <>

                    <NavLink to="/dashboard" className="navButton font-monospace text-dark nav-link">{user.name}'s Page</NavLink>
                    <NavLink to="/login" onClick={logout} className="navButton font-monospace text-dark nav-link">Logout</NavLink>
                </> :<>
                    <NavLink to="/login" className="navButton font-monospace text-dark nav-link">Login</NavLink>
                    <NavLink to="/register" className="navButton font-monospace text-dark nav-link">Register</NavLink>
                </> }


            </Navbar.Collapse>
<!--             {user ?
            <Nav className=" align-self-end">
                <h4>Welcome Back, {user.name}!</h4>
            </Nav> : null -->

<!--             } --> 

        <Navbar expand="lg" className="nav-container">
            <Navbar.Brand href="/" className="d-flex">Pitch Please!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">

                <Nav>
                    <NavLink to="/" className="nav-link navbar-text">Home</NavLink>
                </Nav>
                <Nav>
                    <NavLink to="/about" className="nav-link navbar-text">About</NavLink>
                </Nav>
                <Nav>
                    {user ? <>
                        <NavLink to="/dashboard" className="nav-link navbar-text">{user.name}'s Page</NavLink>
                        <NavLink to="/login" onClick={logout} className="nav-link navbar-text">Logout</NavLink>
                    </> :<>
                        <NavLink to="/login" className="nav-link navbar-text">Login</NavLink>
                        <NavLink to="/register" className="nav-link navbar-text">Register</NavLink>
                    </> }
                </Nav>



            </Navbar.Collapse>

        </Navbar>
    );
}

export default Navigation;
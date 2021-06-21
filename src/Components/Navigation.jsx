import React, {useEffect, useState} from 'react';
import {Nav, Navbar, Form} from "react-bootstrap";
import {NavLink, Redirect} from 'react-router-dom';
import axios from "axios";

function Navigation({setAuth, setUser, user}) {


     function logout(e) {
        e.preventDefault()
        setAuth(false)
        setUser(null)
        localStorage.removeItem("token")
    }

    return (
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

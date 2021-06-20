import logo from './logo.svg';
import React, {useRef, useEffect,useState} from "react";
import './App.css';
import axios from "axios";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import Dashboard from "./Components/auth/Dashboard"
import NotFound from "./Components/auth/NotFound";
import Navigation from "./Components/Navigation";
import {Container} from "react-bootstrap";


function App() {
    const [auth, setAuth] = useState({})
    const [user, setUser] = useState({})

    useEffect(() => {
        async function setUserStats() {
            try {
                let {data} = await axios.get("/auth/user", {
                    headers: {
                        authorization: `Bearer ${localStorage.token}`
                    }
                })
                setAuth(true)
                setUser(data.user)

            } catch (e) {
                setAuth(false)
                setUser({})
                localStorage.removeItem("token")
            }
        }

        setUserStats()
    }, [])




    //  function logout() {
    //     setAuth(false)
    //     setUser(null)
    //     localStorage.removeItem("token")
    // }


  return (
    <Container className="App">
        <BrowserRouter>
            <Navigation setAuth={setAuth} setUser={setUser} user={user} />
            <Switch>
                <Route path="/login">
                    <Login auth={auth} setAuth={setAuth}/>
                </Route>
                <Route path="/register">
                    <Register auth={auth} setAuth={setAuth}/>
                </Route>
                <PrivateRouter auth={auth} user={user} path="/dashboard" Component={Dashboard} />

                {/*<Route path="/dashboard" exact>*/}
                {/*    <Dashboard auth={auth} user={user} logout={logout}/>*/}
                {/*</Route>*/}

                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    </Container>
  );
}
function PrivateRouter({auth, user, Component, path, ...rest}){
    return(
        <>
            { (auth) ?
                <Route path={path} >
                    <Component />
                </Route> : <Redirect to="/login" />
            }
        </>
    )
}
export default App;

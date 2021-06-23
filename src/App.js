
import React, {useRef, useEffect,useState} from "react";
import './App.css';
import axios from "axios";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import Dashboard from "./Components/Display/Dashboard"
import DashboardRec from "./Components/Display/DashboardRec";
import NotFound from "./Components/auth/NotFound";
import Navigation from "./Components/Navigation";
import {Container} from "react-bootstrap";
import Home from "./Components/Display/Home";
import About from "./Components/Display/About";

function App() {
    const [auth, setAuth] = useState({})
    const [user, setUser] = useState({})


    console.log(user)
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
                console.log(data)
            } catch (e) {
                setAuth(false)
                setUser(null)
                localStorage.removeItem("token")
            }
        }

        setUserStats()
    }, [auth])





  return (
    <div>

        <BrowserRouter>
            <div className="banner">

            <Navigation setAuth={setAuth} setUser={setUser} user={user} />
            </div>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/about" exact>
                        <About/>
                    </Route>
                <Route path="/login">
                    <Login auth={auth} setAuth={setAuth}/>
                </Route>
                <Route path="/register">
                    <Register auth={auth} setAuth={setAuth}/>
                </Route>
                <PrivateRouter auth={auth} user={user} path="/dashboard" Component={Dashboard} />
                <PrivateRouter auth={auth} user={user} path="/recruiter" Component={DashboardRec} />

                {/*<Route path="/dashboard" exact>*/}
                {/*    <Dashboard auth={auth} user={user} logout={logout}/>*/}
                {/*</Route>*/}

                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>

    </div>
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

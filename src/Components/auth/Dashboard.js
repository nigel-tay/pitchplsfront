import React, { useEffect, useState } from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";


const Dashboard = ({auth}) => {
    // const [auth, setAuth] = useState({})
    const [user, setUser] = useState({})

    useEffect(() => {
        async function setUserStats() {
            try {
                let {data} = await axios.get("/auth/user", {
                    headers: {
                        authorization: `Bearer ${localStorage.token}`
                    }
                })
                // setAuth(true)
                setUser(data.user)

            } catch (e) {
                // setAuth(false)
                setUser({})
                localStorage.removeItem("token")
            }
        }

        setUserStats()
    }, [])

console.log(user)


 if(user.role === "jobseeker"){
    return (
        <div>
            <h3> HELLO THIS IS A SPACE FOR JOBSEEKERS </h3>
            Welcome back <strong className="text-danger">{user.name}</strong>, insert pitch here
        </div>
    )
 }else {
     return (
         <div>
             <h3> HELLO THIS IS A SPACE FOR RECRUITERS</h3>
             Welcome back, <strong className="text-danger">{user.name}</strong>, search pitch here
         </div>
     )
 }
};

export default Dashboard;

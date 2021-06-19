import React, { useEffect, useState } from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";


const Dashboard = ({auth}) => {
    const [user, setUser] = useState({})


    useEffect(() => {
        async function setUserStats() {
            try {
                let {data} = await axios.get("/auth/user", {
                    headers: {
                        authorization: `Bearer ${localStorage.token}`
                    }
                })
                setUser(data.user)
            } catch (e) {
            }
        }

        setUserStats()
    }, [])





    if(!auth){
        return < Redirect to="/login" />
    }

    return (
        <div>
        <h3> HELLO THIS IS <h2 className="font-weight-light text-danger">{user.name}'s</h2> SPACE</h3>
            <h4>insert pitch here</h4>
        </div>
    );
};

export default Dashboard;

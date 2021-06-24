import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Container} from "react-bootstrap";
import "./DashboardChat.css";
import Pusher from "pusher-js";
import Sidebar from "./Sidebar"
import Chat from "./Chat"

const pusher = new Pusher('aaca110194e03e7b0484', {
    cluster: 'ap1'
});

function DashboardChat(auth) {
    let userID = (auth.user._id)
    const [user, setUser] = useState({})
    console.log(auth)
    console.log(userID)
    const [chat, setChat] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(() => {
            async function setUserStats() {
                try {
                    let {data} = await axios.get("/auth/user", {
                        headers: {
                            authorization: `Bearer ${localStorage.token}`
                        }
                    })
                    setUser(data.user)
                    // console.log(user._id)

                } catch (e) {
                    setUser({})
                    localStorage.removeItem("token")
                }
            }

            setUserStats()
        }, [])

    return (
            <div className="DashboardChat">
                {/*<button onClick={getChat} disabled>*/}
                {/*    Get all Conversation*/}
                {/*</button>*/}
                {/*<button onClick={getConversation}>*/}
                {/*    Get Conversation*/}
                {/*</button>*/}
                {/*<button onClick={addMessage}>*/}
                {/*    Add Message*/}
                {/*</button>*/}
                {/*{*/}
                {/*    messages?.conversation?.map((item) => (*/}
                {/*        <div>{item.message}</div>*/}
                {/*    ))*/}
                {/*}*/}
                <Sidebar auth={auth} user={user}/>
                <Chat auth={auth} user={user}/>
            </div>
    );
}

export default DashboardChat;

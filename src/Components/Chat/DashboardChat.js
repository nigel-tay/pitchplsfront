import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Container} from "react-bootstrap";
import Pusher from "pusher-js";

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
        pusher.unsubscribe('messages')

        getConversation()
        const channel = pusher.subscribe('messages');
        channel.bind('newMessage', function (data) {
            getConversation()
        });
    }, []);


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


    async function getChat() {
        let {data} = await axios.get(`/chat/get/conversationFromRC?id=${userID}`)
        console.log(data)
        console.log("message:",data[0]?.conversation[0]?.message)
        if (data[0]){
            setChat(data[0].conversation[0])
        }
    }


    async function getConversation() {
           await axios.get(`/chat/get/conversation?id=60d401e927522d0988147a8b`)
                .then((res) => {
                    setMessages(res.data[0])

                })
        console.log(messages?.conversation?.[0].message)
    }

    function addMessage() {
        axios.post(`/chat/new/message?id=60d401e927522d0988147a8b`, {
            message: "This is a test!",
            timestamp: Date.now(),
            user: user
        })
    }



    // useEffect( () => {
    //     getChat()
    // }, [])

    console.log(chat?.message)

    return (
        <Container fluid>
            <div>
                <button onClick={getChat} disabled>
                    Get all Conversation
                </button>
                <button onClick={getConversation}>
                    Get Conversation
                </button>
                <button onClick={addMessage}>
                    Add Message
                </button>
                {
                    messages?.conversation?.map((item) => (
                        <div>{item.message}</div>
                    ))
                }

            </div>
        </Container>
    );
}

export default DashboardChat;

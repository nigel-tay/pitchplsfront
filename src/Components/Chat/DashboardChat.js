import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Container} from "react-bootstrap";

// axios.get(`/chat/get/conversationFrom?id=${user}`)
function DashboardChat(auth) {
    let user = (auth.user._id)
    console.log(user)
    const [chat, setChat] = useState([])

    async function getChat() {
        let {data} = await axios.get(`/chat/get/conversationFrom?id=${user}`)
        console.log(data)
        console.log("message:",data[0]?.conversation[0]?.message)
        if (data[0]){
            setChat(data[0].conversation[0])
        }
    }

    // useEffect( () => {
    //     getChat()
    // }, [])

    console.log(chat?.message)

    return (
        <Container fluid>
            <div>
                <button onClick={getChat}>
                    Helloooooo
                </button>
                {chat?.forEach( msg => { <p> {msg.message} </p>})}
            </div>
        </Container>
    );
}

export default DashboardChat;

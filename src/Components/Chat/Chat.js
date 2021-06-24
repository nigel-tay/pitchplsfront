import {IconButton} from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import React, {useEffect, useState} from "react";
import "./Chat.css";
import Message from "./Message";
import FlipMove from "react-flip-move";
import axios from 'axios';
import Pusher from "pusher-js";

const pusher = new Pusher('aaca110194e03e7b0484', {
    cluster: 'ap1'
});

function Chat({user, chatId, chatName}) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);




    function getConversation() {
        axios.get(`/api/chat/get/conversation?id=60d49d46b84852b62dddc556`)
            .then((res) => {
                setMessages(res.data[0].conversation)
            })
        console.log('messages',messages)
        }

    useEffect(() => {
        pusher.unsubscribe('messages')

        getConversation(chatId)
        const channel = pusher.subscribe('messages');
        channel.bind('newMessage', function (data) {
            getConversation(chatId)
        });
    }, [chatId]);

    const sendMessage = (e) => {
        e.preventDefault();

        axios.post(`/api/new/message?id=${chatId}`, {
            message: input,
            timestamp: Date.now(),
            user: user
        });

        setInput("");
    };


    return (
        <div className="chat">
            <div className="chat__header">
                <h4>
                    To: <span className="chat__name">{chatName}</span>
                </h4>
                <strong>Details</strong>
            </div>

            {/* chat messages */}
            <div className="chat__messages">
                <FlipMove>
                    {messages.map(({ user, _id, message, timestamp }) => (
                        <Message key={_id} id={_id} sender={user} message={message} timestamp={timestamp} />
                    ))}
                </FlipMove>
            </div>

            <div className="chat__input">
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="iMessage"
                        type="text"
                    />
                    <button onClick={sendMessage}>Send Message</button>
                </form>
                <button onClick={getConversation}>get convo</button>
                <IconButton>
                    <MicNoneIcon className="chat__mic"/>
                </IconButton>
            </div>
        </div>
    );
}

export default Chat;

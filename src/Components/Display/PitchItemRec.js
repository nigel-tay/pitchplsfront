import React, {useEffect, useRef, useState} from 'react';
import {Container, Card, Col, Row, Modal, Form, InputGroup, FormControl} from "react-bootstrap";
import axios from "axios"
import styles from "./PitchItem.module.css"

function PitchItemRec({item}) {
    const [user, setUser] = useState({})
    const [post, setPost] = useState({})
    const [fav, setFav] = useState({})

    const form = useRef(null)

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
                setUser({})
                localStorage.removeItem("token")
            }
        }

        setUserStats()
    }, [])


    async function submitFav(e) {
        e.preventDefault(e)
        console.log(item)
        setFav(item)
        console.log(fav)
        if (item) {
            try {
                let res = await axios.put(`/user/edit/`, item, {
                    headers: {
                        authorization: `Bearer ${localStorage.token}`
                    }
                })
                console.log(res)

            } catch (e) {
                console.log(e)
            }
        }
    }

    async function chatStart(e) {
        e.preventDefault()

        const chatName = item.title
        const firstMsg = prompt('Please enter a welcome message')

        window.open(`http://localhost:3001/`, '_blank')

        if (chatName && firstMsg) {
            let chatId = ''

            axios.post('http://localhost:9000/new/conversation', {
                chatName: chatName
            }).then((res) => {
                chatId = res.data._id
            }).then(() => {
                axios.post(`http://localhost:9000/new/message?id=${chatId}`, {
                    message: firstMsg,
                    timestamp: Date.now(),
                    user: user
                })
            })
        }
    }


    return (

        <div>


            <div className={`${styles.makethishover}`}>
                <ul>
                    <li style={{background: `${item.color}`}}>

                        <Form ref={form} id="form" onSubmit={submitFav} method="post">
                            <h4>{item.title}</h4>
                            <span> usp: {item.usp}, </span>
                            <span>  {item.goals}, </span>
                            <span>  {item.selfintro}</span>
                            <Row className="justify-content-end"
                                 style={{
                                     position: "fixed",
                                     width: "100%",
                                     bottom: 0,
                                     paddingBottom: 10
                                 }}>
                                <Col md={12}>
                                    <button type="submit"> Set Fav</button>
                                    <button onClick={chatStart} > Chat here!</button>
                                </Col>
                            </Row>
                        </Form>

                    </li>
                </ul>
            </div>


        </div>
    );
}

export default PitchItemRec;

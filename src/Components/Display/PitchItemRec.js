import React, {useEffect, useRef, useState} from 'react';
import {Container, Card, Col, Row, Modal, Form, InputGroup, FormControl} from "react-bootstrap";
import axios from "axios"
import styles from "./PitchItem.module.css"



function PitchItemRec({item, setShowFav, user}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const form = useRef(null)

    async function getFave() {

        let {data} = await axios.get(`/user/${user._id}`)
        // console.log("fav", data.user.favourites)
        if (data.user.favourites) {
            setShowFav(data.user.favourites.reverse())
        } else {
            setShowFav(null)
        }
    }

    async function submitFav(e) {
        e.preventDefault(e)
        // setShow(false)
        console.log("item id", item._id)

        if (item) {
            try {
                let res = await axios.put(`/user/edit/`, item, {
                    headers: {
                        authorization: `Bearer ${localStorage.token}`
                    }
                })
                getFave()
                console.log(res.data)

            } catch (e) {
                console.log(e)
            }
        }
    }

    async function chatStart(e) {
        e.preventDefault()
        const chatName = item.title
        const firstMsg = prompt('Please enter a welcome message')
        if (chatName && firstMsg) {
            let chatId = ''
            let recId = ''
            let jsId = ''
            await axios.get(`/user/${user._id}`)
                .then((res)=>{
                    recId = res.data.user._id
                    jsId = item.creator
                    console.log(recId)
                    console.log(jsId)
                })
            await axios.post('http://localhost:9000/new/conversation', {
                chatName: chatName
            }).then((res) => {
                chatId = res.data._id
            }).then(() => {
                window.open(`http://localhost:3001/`, '_blank')
                axios.post(`http://localhost:9000/new/message?id=${chatId}&recId=${recId}&jsId=${jsId}`, {
                    message: firstMsg,
                    timestamp: Date.now(),
                    user: user
                })
            })
        }
    }

    return (

        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{item.title}</Modal.Title>
                    <button className="px-2" onClick={handleClose}> x </button>
                </Modal.Header>
                <Modal.Body>
                    <p>{item.selfintro}</p>
                    <p>{item.usp}</p>
                    <p>{item.goals} </p>
                </Modal.Body>
            </Modal>

            <div className={`${styles.makethishover}`}>
                <ul>
                    <li style={{background: `${item.color}`}}>


                            <h4>{item.title}</h4>
                        <span>  {item.selfintro}</span>
                        <span> {item.usp}, </span>
                        <span >  {item.goals}, </span>
                            <Row className="justify-content-center"
                                 style={{
                                     position: "fixed",
                                     width: "100%",
                                     bottom: 0,
                                     paddingBottom: 10,
                                 }}>
                                <Col md={4}>

                                    <Form ref={form} id="form" onSubmit={submitFav} method="post">
                                    <button type="submit" className="btn bg-transparent"><img src="https://img.icons8.com/offices/30/000000/filled-like.png"/> </button>
                                    </Form>
                                </Col>
                                        <Col md={4}>
                                        <button className="btn bg-transparent border border-dark text-dark" onClick={chatStart} > Chat!</button>
                                        </Col>


                                <Col md={4}>
                                    <button className="btn bg-transparent border border-dark text-dark" onClick={handleShow}> More </button>

                                </Col>
                            </Row>


                    </li>
                </ul>
            </div>


        </div>
    );
}

export default PitchItemRec;

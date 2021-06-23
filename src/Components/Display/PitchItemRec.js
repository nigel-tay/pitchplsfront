import React, {useEffect, useRef, useState} from 'react';
import {Container, Card, Col, Row, Modal, Form, InputGroup, FormControl} from "react-bootstrap";
import axios from "axios"
import styles from "./PitchItem.module.css"



function PitchItemRec({item, user, setShowFav}) {
    // const [user, setUser] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showComment, setShowComment] = useState(false);
    const handleCloseComment = () => setShowComment(false);
    const handleShowComment = () => setShowComment(true);
    const [comment, setComment] = useState({name: user.name, text: ""})

    const form = useRef(null)

    // useEffect(() => {
    //     async function setUserStats() {
    //         try {
    //             let {data} = await axios.get("/auth/user", {
    //                 headers: {
    //                     authorization: `Bearer ${localStorage.token}`
    //                 }
    //             })
    //             setUser(data.user)
    //
    //         } catch (e) {
    //             setUser({})
    //             localStorage.removeItem("token")
    //         }
    //     }
    //
    //     setUserStats()
    // }, [])



    async function getFavourites() {
        console.log('YOUR MATHER')
        let {data} = await axios.get(`/user/${user._id}`)
        // console.log("data",data)
        // console.log("fav", data.user.favourites)
        if (data.user.favourites) {
            setShowFav(data.user.favourites.reverse())
        } else {
            setShowFav(null)
        }
    }
    async function submitFav(e) {
        e.preventDefault(e)
        console.log("item id", item._id)
        if (item) {
            try {
                let res = await axios.put(`/user/edit/`, item, {
                    headers: {
                        authorization: `Bearer ${localStorage.token}`
                    }
                })
                console.log(res.data)

            } catch (e) {
                console.log(e)
            }
        }
        getFavourites()
    }

    // async function chatStart(e) {
    //     e.preventDefault()
    //     const chatName = item.title
    //     if (chatName) {
    //         let chatId = ''
    //         axios.post('http://localhost:9000/new/conversation', {
    //             chatName: chatName
    //         }).then((res) => {
    //             chatId = res.data._id
    //         }).then(() => {
    //             const firstMsg = prompt('Please enter a welcome message')
    //             window.open(`http://localhost:3001/`, '_blank')
    //             axios.post(`http://localhost:9000/new/message?id=${chatId}`, {
    //                 message: firstMsg,
    //                 timestamp: Date.now(),
    //                 user: user
    //             })
    //         })
    //     }
    // }


    function changeComment(e) {
        setComment(prevState => ({...prevState, [e.target.name]: e.target.value}))

        console.log("item", item)
    }

    async function postComment(e) {
        e.preventDefault()
        try{
            await axios.put(`/pitch/editcomment/${item._id}`, comment);
            setShowComment(false)

        }catch (e) {
            console.log(e.response)
        }
    }


    return (

        <div>
            <Modal show={showComment} onHide={handleCloseComment}>
                <Form ref={form} id="form" onSubmit={postComment} method="post">
                    <Row className="justify-content-center mx-2">
                        <label>Title * </label>

                        <input onChange={changeComment}
                               type="text"
                               name="text"
                               rows="3"
                               cols="60"
                               className="form-control"
                               aria-describedby="Enter title"
                               placeholder="Enter comment"
                        />

                        <button onClick={postComment} className="btn border-dark text-center m-2">
                            <h3>Comment</h3>
                        </button>

                    </Row>
                </Form>
            </Modal>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{item.title}</Modal.Title>
                    <button className="px-2" onClick={handleClose}> x </button>
                </Modal.Header>
                <Modal.Body>
                    <p>{item.usp}</p>
                    <p>{item.goals} </p>
                    <p>{item.selfintro}</p>
                    <p>Comments:
                        { item.comments?.map(comment => (

                            <div>{comment.name} said: {comment.text}</div>
                        ))}
                    </p>
                    <button className="btn bg-transparent text-dark" onClick={handleShowComment} >Comment</button>
                </Modal.Body>
            </Modal>

            <div className={`${styles.makethishover}`}>
                <ul>
                    <li style={{background: `${item.color}`}}>


                            <h4>{item.title}</h4>
                        <span>  {item.selfintro}</span>
                        <span> {item.usp}, </span>
                        <span>  {item.goals}, </span>
                            <Row className="justify-content-center"
                                 style={{
                                     position: "fixed",
                                     width: "90%",
                                     bottom: 0,
                                     paddingBottom: 0
                                 }}>
                                <Col md={4}>

                                    <Form ref={form} id="form" onSubmit={submitFav} method="post">
                                    <button type="submit" className="btn bg-transparent"><img src="https://img.icons8.com/offices/30/000000/filled-like.png"/> </button>
                                    </Form>
                                </Col>
                                        {/*<Col md={4}>*/}

                                        {/*</Col>*/}


                                <Col md={4}>
                                    <button className="btn bg-transparent text-dark" onClick={handleShow}> More </button>

                                </Col>
                            </Row>


                    </li>
                </ul>
            </div>


        </div>
    );
}

export default PitchItemRec;

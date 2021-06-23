import React, {useRef, useState} from 'react';
import {Col, Row, Form, Modal} from "react-bootstrap";
import styles from "./PitchItem.module.css"
import axios from "axios";
import {BrowserRouter, Redirect, Route, Switch, NavLink} from "react-router-dom";
import Message from "./Message";

function FavouritePitches({item, user,setShowFav}) {
    const form = useRef(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const [post, setPost] = useState({name: user.name, text: ""})
    // const [showMessage, setShowMessage] = useState(false);
    // const handleCloseMessage = () => setShowMessage(false);
    // const handleShowMessage = () => setShowMessage(true);
    // const [message, setMessage] = useState({name: user.name, text: ""})




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

    async function removeFav(e) {
        e.preventDefault(e)
        console.log("remove",item)
        if (item) {
            try {
                let res = await axios.put(`/user/editing/`, item, {
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

    async function postComment(e) {
        e.preventDefault()
        try{
        await axios.put(`/pitch/editcomment/${item._id}`, post);
        alert('Commented!');
        setShowEdit(false)
        }catch (e) {
            console.log(e.response)
        }
    }


    function change(e) {
        setPost(prevState => ({...prevState, [e.target.name]: e.target.value}))
        console.log(post)
        console.log("item", item)
    }

    // async function postMessage(e) {
    //     e.preventDefault()
    //     try{
    //         await axios.put(`/pitch/editcomment/${item._id}`, post);
    //         alert('Pitch Edited!');
    //         // setShowEdit(false)
    //     }catch (e) {
    //         console.log(e.response)
    //     }
    // }

    // function changMessage(e) {
    //     setMessage(prevState => ({...prevState, [e.target.name]: e.target.value}))
    //     console.log(message)
    //     // console.log("item", item)
    // }

    // function redirectToMessage(){
    //     return <Redirect to="/message" />
    // }

    return (
        <div>

            <Message user={user} item={item}/>


            {/*<Modal show={showMessage} onHide={handleCloseMessage}>*/}
            {/*    <Modal.Header>*/}
            {/*        <Modal.Title>Messages</Modal.Title>*/}
            {/*        <button className="px-2" onClick={handleCloseMessage}> x </button>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        <span> {item.selfintro}</span>*/}
            {/*        <p>{item.usp}</p>*/}
            {/*        <p>{item.goals} </p>*/}
            {/*        <p>{item.selfintro}</p>*/}
            {/*        <p>Comments:*/}
            {/*            {*/}
            {/*                item?.comments?.map(comment => (*/}
            {/*                    <div>{comment.name} said: {comment.text}</div>*/}
            {/*                ))}*/}
            {/*        </p>*/}
            {/*        <button className="btn bg-transparent text-dark" onClick={handleShowEdit}> Comment </button>*/}
            {/*    </Modal.Body>*/}
            {/*</Modal>*/}


            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{item.title}</Modal.Title>
                    <button className="px-2" onClick={handleClose}> x </button>
                </Modal.Header>
                <Modal.Body>
                    <span> {item.selfintro}</span>
                    <p>{item.usp}</p>
                    <p>{item.goals} </p>
                    <p>{item.selfintro}</p>
                    <p>Comments:
                        {
                            item?.comments?.map(comment => (
                                <div>{comment.name} said: {comment.text}</div>
                            ))}
                    </p>
                    <button className="btn bg-transparent text-dark" onClick={handleShowEdit}> Comment </button>
                </Modal.Body>
            </Modal>

            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Form ref={form} id="form" onSubmit={postComment} method="post">
                    <Row className="justify-content-center mx-2">
                        <label>Title * </label>

                        <input onChange={change}
                               type="text"
                               name="text"
                               rows="3"
                               cols="60"
                               className="form-control"
                               aria-describedby="Enter title"
                               placeholder="Enter comment"
                               />

                        <button onClick={postComment} className="btn  border-dark text-center m-2">
                            <h4>Comment</h4>
                        </button>

                    </Row>
                </Form>
            </Modal>


            <ul>
                <li style={{background: `${item.color}`}}>


                    <h4 className="font-monospace"> {item.title}</h4>
                    <span>  {item.selfintro}</span>
                    <span> {item.usp}, </span>
                    <span>  {item.goals}, </span>

                    <Row className="justify-content-end"
                         style={{
                             position: "fixed",
                             width: "100%",
                             bottom: 0,
                             paddingBottom: 0
                         }}>
                        <Col md={4}>
                        <Form ref={form} id="form" onSubmit={removeFav}>

                            <button className="btn bg-transparent" type="submit"><img src="https://img.icons8.com/offices/30/000000/dislike.png"/></button>

                            </Form>
                        </Col>
                        <Col md={4}>
                            <NavLink to="/message"> Message </NavLink>
                        </Col>
                        <Col md={4}>
                        <button className="btn bg-transparent text-dark" onClick={handleShow}> More </button>
                        </Col>

                    </Row>


                </li>
            </ul>
        </div>
    );
}

export default FavouritePitches;

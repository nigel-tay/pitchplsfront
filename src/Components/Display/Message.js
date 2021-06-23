import React, {useRef, useState} from 'react';
import axios from "axios";
import styles from "./Dashboard.module.css";
import {Col, Form, Modal, Row} from "react-bootstrap";
import Reply from "./Reply";

function Message({user, item}) {
    const [message, setMessage] = useState({sender: user._id, name: user.name, text: ""})
    const form = useRef(null)
    const [myMsg, setMyMsg] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [showMessage, setShowMessage] = useState(false);
    // const handleCloseMessage = () => setShowMessage(false);
    // const handleShowMessage = () => setShowMessage(true);
    // const [message, setMessage] = useState({name: user.name, text: ""})


    async function postMessage(e) {
        e.preventDefault()
        console.log(message)
        try{
            await axios.put(`/user/messages/${item.creator}`, message);
            // alert('Pitch Edited!');
            handleClose()
        }catch (e) {
            console.log(e.response)
        }
    }

    function changeMessage(e) {
        setMessage(prevState => ({...prevState, [e.target.name]: e.target.value}))
        console.log(message)
        // console.log("item", item)
    }

    async function getMessage() {
        handleShow()
        try{
            let {data} = await axios.get(`/user/${user._id}`);
            console.log(data.user.messages)
            setMyMsg(data.user.messages)
            // setMyMsg(data.messages)
            // alert('Pitch Edited!');
            // console.log(message)
        }catch (e) {
            console.log(e.response)
        }
    }

// console.log(item)


    return (
        <div className="App">
            <button onClick={getMessage}> Message </button>
            <Modal show={show} onHide={handleClose}>
                <div className={`border border-dark border-2`}>
                    <h3 className="text-center mt-4"> Create New Message:</h3>
                    <Form ref={form} id="form" onSubmit={postMessage} method="post">
                        <Row className="justify-content-center mx-2">
                            <label>Message * </label>

                            <textarea onChange={changeMessage}
                                      type="text"
                                      name="text"
                                      rows = "2"
                                      cols = "30"
                                      className="form-control"
                                      aria-describedby="Enter title"
                                      placeholder="Enter title"
                            />
                            <Col md={3}>
                            <button type="submit" className="btn bg-transparent text-danger text-center">
                                <img style={{width:"100%"}} className="navButton" src="https://i.pinimg.com/originals/c4/cd/cc/c4cdccefc24e88ba6f4f1bbaeb817c2c.png" />
                            </button>
                            </Col>
                            <h3 className="text-center font-monospace">messages:</h3>
                            <div className={`border border-dark border-2`}>

                                {myMsg.map(msg => (
                                   <div className="border-bottom pb-2 border-dark"> <span className="text-success">{msg.name} wrote:</span>  {msg.text}  </div>

                                ))}

                            </div>
                        </Row>
                    </Form>
                </div>
                    {/*<button className="btn bg-transparent text-dark" onClick={handleShowEdit}> Comment </button>*/}

            </Modal>



        </div>
    );
}

export default Message;

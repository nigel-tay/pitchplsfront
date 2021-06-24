import React, {useRef, useState} from 'react';
import axios from "axios";
import styles from "./Dashboard.module.css";
import {Col, Form, Modal, Row} from "react-bootstrap";
import Reply from "./Reply";
import Single from "./Single";
import EmailIcon from '@material-ui/icons/Email';

function Message({user, item}) {
    const [message, setMessage] = useState({sender: user._id, title: item.title, pitchId: item._id, name: user.name, text: "", time: Date.now()})
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
            await axios.put(`/api/user/messages/${item.creator}`, message);
            console.log(item.creator)
            console.log(item.title)
            console.log("msg", message)
            alert('Message Sent! :D');
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

        try{
            let {data} = await axios.get(`/api/user/${user._id}`);
            console.log(data.user.messages)
            setMyMsg(data.user.messages.reverse())
            // setMyMsg(data.messages)
            // alert('Pitch Edited!');
            // console.log(message)
        }catch (e) {
            console.log(e.response)
        }
        handleShow()
    }



// console.log(item)


    return (
        <div className="App">
            <button
                className="btn bg-transparent navButton"
                onClick={getMessage}>
                <EmailIcon />
            </button>

            <Modal show={show} onHide={handleClose}>
                <div className={`border border-dark border-2 text-center`}>
                    <img style={{width:"20%"}} className="navButton" src="https://i.pinimg.com/originals/c4/cd/cc/c4cdccefc24e88ba6f4f1bbaeb817c2c.png" />


                        <Row className="justify-content-center mx-2">

                            <label>Type Your Message Here * </label>

                            <textarea onChange={changeMessage}
                                      type="text"
                                      name="text"
                                      rows = "2"
                                      cols = "30"
                                      className="form-control"
                                      aria-describedby="Enter title"
                                      placeholder="Say something nice ......"
                                      required={true}
                            />
                            <Form ref={form} id="form" onSubmit={postMessage} method="post">
                            <Row  className="justify-content-end">
                            <button type="submit" style={{width:"20%"}} className="btn bg-info text-center navButton my-2">
                            Send
                            </button>
                            </Row>
                    </Form>


                            {/*<h3 className="text-center font-monospace border-top border-2 border-dark">messages:</h3>*/}
                            {/*<div className={`border border-dark border-2`}>*/}
                            {/*    */}
                            {/*    {myMsg.map(msg => (*/}
                            {/*        <div className="border-bottom py-5 border-dark">*/}
                            {/*            <Reply msg={msg} user={user} />*/}
                            {/*        </div>*/}
                            {/*    ))}*/}
                            {/*  */}

                            {/*</div>*/}

                        </Row>

                </div>
                    {/*<button className="btn bg-transparent text-dark" onClick={handleShowEdit}> Comment </button>*/}

            </Modal>



        </div>
    );
}

export default Message;

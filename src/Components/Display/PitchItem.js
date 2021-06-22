import React, {useRef, useState} from 'react';
import {Container, Card, Col, Row, Modal, Form} from "react-bootstrap";
import axios from "axios"
import styles from "./PitchItem.module.css"


function PitchItem({item}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const [post, setPost] = useState({})
    const form = useRef(null)


    async function deletePost() {
        await axios.delete(`/pitch/delete/${item._id}`);
        console.log('Delete successful');
    }


    function change(e) {
        setPost(prevState => ({...prevState, [e.target.name]: e.target.value}))

        console.log(post)
    }

    async function editPost(e) {
        e.preventDefault()
        await axios.put(`/pitch/edit/${item._id}`, post);
        alert('Pitch Edited!');
        setShowEdit(false)
    }


    return (

        <div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{item.title}</Modal.Title>
                    <button className="px-2" onClick={handleClose}> x</button>
                </Modal.Header>
                <Modal.Body>
                    <p>{item.usp}</p>
                    <p>{item.goals} </p>
                    <p>{item.selfintro}</p>
                </Modal.Body>
            </Modal>

            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Form ref={form} id="form" onSubmit={editPost} method="post">
                    <Row className="justify-content-center mx-2">
                        <label>Title * </label>

                        <input onChange={change}
                               type="text"
                               name="title"
                               rows="3"
                               cols="60"
                               className="form-control"
                               aria-describedby="Enter title"
                               placeholder="Enter title"
                               defaultValue={item.title}
                               required={true}/>

                        <label>Self intro *</label>
                        <textarea onChange={change}
                                  rows="5"
                                  cols="60"
                                  type="text"
                                  name="selfintro"
                                  className="form-control"
                                  placeholder="Enter self Intro"
                                  defaultValue={item.selfintro}
                                  maxLength={200}/>


                        <label>USP *</label>
                        <textarea onChange={change}
                                  type="text"
                                  name="usp"
                                  rows="5"
                                  cols="60"
                                  className="form-control"
                                  aria-describedby="Enter usp "
                                  placeholder="Enter usp "
                                  defaultValue={item.usp}
                                  maxLength={200}/>

                        <label>Goals *</label>
                        <textarea onChange={change}
                                  type="text"
                                  name="goals"
                                  rows="5"
                                  cols="60"
                                  className="form-control"
                                  aria-describedby="Enter goals"
                                  placeholder="Enter goals"
                                  defaultValue={item.goals}
                                  maxLength={200}/>

                        <button type="submit" className="btn border-dark text-center m-2">
                            <h3>Edit pitch</h3>
                        </button>

                    </Row>
                </Form>
            </Modal>

            <Row>


                <ul>
                    <li style={{background: `${item.color}`}}>


                        <h4 className="font-monospace">{item.title}</h4>
                        <span>  {item.selfintro}</span>
                        <span> {item.usp}, </span>
                        <span>  {item.goals}, </span>

                        <Row className="justify-content-end"
                             style={{
                                 position: "fixed",
                                 width: "100%",
                                 bottom: 0,
                                 paddingBottom: 10
                             }}>
                            <Col md={12}>
                                <button className="px-2 mx-1" onClick={handleShow}> show</button>
                                <button className="px-2 mx-1" onClick={handleShowEdit}> edit</button>
                                <button className="px-2" onClick={deletePost}> x</button>

                            </Col>
                        </Row>

                    </li>
                </ul>

            </Row>

        </div>
    );
}

export default PitchItem;

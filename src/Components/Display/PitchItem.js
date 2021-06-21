import React, {useRef, useState} from 'react';
import {Container, Card, Col, Row, Modal, Form} from "react-bootstrap";
import axios from "axios"
import styles from "./PitchItem.module.css"

function PitchItem({item}, props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const [post, setPost] = useState({})
    const form = useRef(null)



    // const handleClick=(e)=>{
    //     console.log("this is working fine");
    //     e.preventDefault();
    //     e.target.style.background = 'FFFFCCFF' ? 'pink' : 'FFFFCCFF'
    //     console.log(e.target);
    // }

    async function deletePost() {
        await axios.delete(`/pitch/delete/${item._id}`);
        console.log('Delete successful');
    }


    function change(e) {
        setPost(prevState => ({...prevState, [e.target.name]: e.target.value}))
        // setPost(e.target.value)
        console.log(post)
    }

    async function editPost(e) {
        e.preventDefault()
        await axios.put(`/pitch/edit/${item._id}`,post);
        alert('Pitch Edited!');
        setShowEdit(false)
    }




    return (
<div>

        <Row>

            <ul>
                <li>
                    <a href="#">

                        <h4 className="font-monospace">{item.title}</h4>
                        <span> usp: {item.usp}, </span>
                        <span>  {item.goals}, </span>
                        <span>  {item.selfintro}</span>
                        <Row className="justify-content-end">
                            <Col md={10}>
                                <button className="px-2 mx-1" onClick={handleShow}> show </button>
                                <button className="px-2 mx-1" onClick={handleShowEdit}> edit </button>
                        <button className="px-2" onClick={deletePost}> x </button>
                            </Col>
                        </Row>
                    </a>

                </li>
            </ul>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{item.title}</Modal.Title>
                    <button className="px-2" onClick={handleClose}> x </button>
                </Modal.Header>
                <Modal.Body>
                    <p>{item.usp}</p>
                    <p>{item.goals} </p>
                    <p>{item.selfintro}</p>
                </Modal.Body>
            </Modal>

        </Row>

    <Modal show={showEdit} onHide={handleCloseEdit}>
    <Form ref={form} id="form" onSubmit={editPost}  method="post">
        <Row className="justify-content-center mx-2">
            <label>Title * </label>

            <input onChange={change}
                      type="text"
                      name="title"
                      rows = "3"
                      cols = "60"
                      className="form-control"
                      aria-describedby="Enter title"
                      placeholder="Enter title"
                   defaultValue={item.title}
                      required={true}/>

            <label>Self intro *</label>
            <textarea onChange={change}
                      rows = "5"
                      cols = "60"
                      type="text"
                      name="selfintro"
                      className="form-control"
                      placeholder="Enter self Intro"
                      defaultValue={item.selfintro}
                      maxLength={200} />



            <label>USP *</label>
            <textarea onChange={change}
                      type="text"
                      name="usp"
                      rows = "5"
                      cols = "60"
                      className="form-control"
                      aria-describedby="Enter usp "
                      placeholder="Enter usp "
                      defaultValue={item.usp}
                      maxLength={200}/>

            <label>Goals *</label>
            <textarea onChange={change}
                      type="text"
                      name="goals"
                      rows = "5"
                      cols = "60"
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

</div>
    );
}

export default PitchItem;

import React, {useState} from 'react';
import {Container, Card, Col, Row, Modal} from "react-bootstrap";
import axios from "axios"
import styles from "./PitchItem.module.css"

function PitchItem({item}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    return (


        <Row>

            <ul>
                <li onClick={handleShow}>
                    <a href="#">

                        <h4 className="font-monospace">{item.title}</h4>
                        <span> usp: {item.usp}, </span>
                        <span>  {item.goals}, </span>
                        <span>  {item.selfintro}</span>
                        <Row className="justify-content-end">
                            <Col md={3}>
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
                    <p>usp: {item.usp}</p>
                    <p>{item.goals} </p>
                    <p>{item.selfintro}</p>
                    <p>{item.selfintro}</p>
                </Modal.Body>
            </Modal>

        </Row>






    );
}

export default PitchItem;

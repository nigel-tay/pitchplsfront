import React, {useEffect, useRef, useState} from 'react';
import {Col, Row, Form, Modal} from "react-bootstrap";
import styles from "./PitchItem.module.css"
import axios from "axios";

function FavouritePitches({item, setShowFav}) {
    const [user, setUser] = useState({})
    const form = useRef(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    async function getFave() {

        let {data} = await axios.get(`/user/${user._id}`)
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
                getFave()
                console.log(res.data)

            } catch (e) {
                console.log(e)
            }
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
                    <span> {item.selfintro}</span>
                    <p>{item.usp}</p>
                    <p>{item.goals} </p>
                    <p>{item.selfintro}</p>
                </Modal.Body>
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
                             paddingBottom: 10
                         }}>
                        <Col md={6}>
                        <Form ref={form} id="form" onSubmit={removeFav}>
                        <button className="btn bg-transparent" type="submit"><img src="https://img.icons8.com/offices/30/000000/dislike.png"/></button>
                        </Form>
                        </Col>
                        <Col md={6}>
                        <button className="btn bg-light text-dark" onClick={handleShow}> See More </button>
                        </Col>
                    </Row>


                </li>
            </ul>
        </div>
    );
}

export default FavouritePitches;

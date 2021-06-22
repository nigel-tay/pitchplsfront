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

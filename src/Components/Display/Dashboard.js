import React, {useRef, useEffect, useState } from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";
import {Container, Form, Row,Col} from "react-bootstrap";
import PitchItem from "./PitchItem";
import styles from "./Dashboard.module.css"
import InfoIcon from '@material-ui/icons/Info';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


const Dashboard = () => {
    const [user, setUser] = useState({})
    const [pitch, setPitch] = useState([])
    const [post, setPost] = useState({})
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
                // console.log(user._id)

            } catch (e) {
                setUser({})
                localStorage.removeItem("token")
            }
        }

        setUserStats()
    }, [])


    useEffect(() =>{
        setPost({creator : user._id})
        // console.log(post)
    },[user])


//this is to get pitch from a user

    async function getPitch() {
        let {data} = await axios.get(`/user/${user._id}`)
        console.log("testing")
        if(data.user.pitches){
            setPitch(data.user.pitches.reverse())
        }else {
            setPitch(null)
        }
    }

    useEffect(() => {

        getPitch()
    }, [user])


    async function submitPost(e) {
        e.preventDefault(e)
        try {
            let res = await axios.post(`/pitch/create`, post, {
            })
            console.log(res)
            getPitch()
        } catch (e) {
            console.log(e)
        }
    }


    function change(e) {
        setPost(prevState => ({...prevState, [e.target.name]: e.target.value}))
        console.log(post)
    }







if(user.role === "recruiter"){
   return < Redirect to="/recruiter" />
}

//////////this part is for jobseeker//////////

    return (
        <Container fluid>
            <Row>
                {/*<Col md={4} className="">*/}
                        <Col md={3} className={`${styles.sidebar} border border-dark border-2`}>
                    <h4 className="text-center mt-2"> Create New Pitch:</h4>
                    <Form ref={form} id="form" onSubmit={submitPost} method="post">
                        <Row className="justify-content-center mx-2 text-center">

                            <div className="d-flex justify-content-center align-content-center">
                                <label>Title</label>
                                <Tippy
                                    content={<>
                                        A short and concise <br/>
                                        summary of what <br/>
                                        your skills are
                                        </>}
                                    placement="right"
                                >
                                    <InfoIcon
                                              color="disabled"
                                              style={{ fontSize: "1em" }}
                                    />
                                </Tippy>
                            </div>

                            <textarea onChange={change}
                                   type="text"
                                   name="title"
                                   rows = "2"
                                   cols = "30"
                                   className="form-control"
                                   aria-describedby="Enter title"
                                   placeholder="Enter title"
                                   required={true}
                             />


                            <div className="d-flex justify-content-center align-content-center">
                                <label>Self intro</label>
                                <Tippy
                                    content={<>
                                        Introduce yourself<br/>
                                        and add a simple<br/>
                                        greeting
                                    </>}
                                    placement="right"
                                >
                                    <InfoIcon
                                        color="disabled"
                                        style={{ fontSize: "1em" }}
                                    />
                                </Tippy>
                            </div>
                            <textarea onChange={change}
                                      rows = "3"
                                      cols = "30"
                                      type="text"
                                      name="selfintro"
                                      className="form-control"
                                      placeholder="Enter self Introduction"
                                      required={true}
                                      maxLength={200} />


                            <div className="d-flex justify-content-center align-content-center">
                                <label>USP</label>
                                <Tippy
                                    content={<>
                                        A Unique Selling Point<br/>
                                        that sets you out from<br/>
                                        your competition
                                    </>}
                                    placement="right"
                                >
                                    <InfoIcon
                                        color="disabled"
                                        style={{ fontSize: "1em" }}
                                    />
                                </Tippy>
                            </div>
                            <textarea onChange={change}
                                   type="text"
                                   name="usp"
                                      rows = "3"
                                      cols = "30"
                                   className="form-control"
                                   aria-describedby="Enter usp "
                                   placeholder="Enter USP"
                                   required={true}
                                      maxLength={200}/>

                            <div className="d-flex justify-content-center align-content-center">
                                <label>Goals</label>
                                <Tippy
                                    content={<>
                                        What you hope<br/>
                                        to achieve; or<br/>
                                        bring to the table
                                    </>}
                                    placement="right"
                                >
                                    <InfoIcon
                                        color="disabled"
                                        style={{ fontSize: "1em" }}
                                    />
                                </Tippy>
                            </div>
                            <textarea onChange={change}
                                   type="text"
                                   name="goals"
                                      rows = "3"
                                      cols = "30"
                                   className="form-control"
                                   aria-describedby="Enter goals"
                                   placeholder="Enter goals"
                                   required={true}
                            maxLength={200}/>

                            <div className="d-flex justify-content-center align-content-center">
                                <label>Colour</label>
                                <Tippy
                                    content={<>
                                        Select the colour<br/>
                                        of your post it<br/>
                                        Pitch
                                    </>}
                                    placement="right"
                                >
                                    <InfoIcon
                                        color="disabled"
                                        style={{ fontSize: "1em" }}
                                    />
                                </Tippy>
                            </div>
                            <select onChange={change}
                                    required={true}
                                    placeholder="select colour!"
                                    name="color"
                                    type="text"
                                    className="py-2"
                                    >
                                <option value={""}>Please Choose A Colour</option>
                                <option value={"beige"}>Beige</option>
                                <option value={"lightpink"}>Light Pink</option>
                                <option value={"lightblue"}>Light blue</option>
                                <option value={"violet"}>Violet</option>
                                <option value={"lightgreen"}>Light Green</option>
                            </select>

                            <button type="submit" className="btn border-dark text-center m-2">
                                <h4>CREATE PITCH</h4>
                            </button>

                        </Row>
                    </Form>
                        </Col>
                    {/*</div>*/}
                {/*</Col>*/}

                <Col md={9} className={`${styles.makeThisScroll} border border-2 border-dark`} >
                    <div style={{
                        display:"grid",
                        gridTemplateColumns: "repeat(3, auto)",
                        gridGap: "1px",
                        margin: "2px",
                    }} >
                    {pitch.map((item,i) => (
                        <PitchItem item={item} setPitch={setPitch}
                                key ={i}/>
                    )) }
                    </div>
                </Col>

            </Row>


        </Container>
    )

 }

export default Dashboard;

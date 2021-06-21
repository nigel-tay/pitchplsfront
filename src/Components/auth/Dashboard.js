import React, {useRef, useEffect, useState } from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";
import {Container, Form, Row,Col} from "react-bootstrap";
import PitchItem from "../Display/PitchItem";
import styles from "./Dashboard.module.css"


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
    useEffect(() => {
        async function getPitch() {
            let {data} = await axios.get(`/user/${user._id}`)
            if(data.user.pitches){
            setPitch(data.user.pitches)
            }else {
                setPitch(null)
            }
        }

        getPitch()
    }, [user, pitch])


    async function submitPost(e) {
        e.preventDefault()
        try {
            let res = await axios.post(`/pitch/create`, post, {
            })
            console.log(res)
            //get response
        } catch (e) {
            console.log(e)
        }
    }


    function change(e) {
        setPost(prevState => ({...prevState, [e.target.name]: e.target.value}))
        console.log(post)
    }






//////////this part is for jobseeker//////////
 if(user.role === "jobseeker"){
    return (
        <Container>
            <h3> HELLO THIS IS A SPACE FOR JOBSEEKERS </h3>
            Welcome back <strong className="text-danger">{user.name}</strong>, insert pitch here

            <Row>
                <Col md={3} className={`${styles.sidebar} mx-2`}>

                    <h3 className="text-center"> Create New Pitch:</h3>
                    <Form ref={form} id="form" onSubmit={submitPost} method="post">
                        <Row className="justify-content-center mx-2">
                            <label>Title * </label>

                            <textarea onChange={change}
                                   type="text"
                                   name="title"
                                   rows = "3"
                                   cols = "60"
                                   className="form-control"
                                   aria-describedby="Enter title"
                                   placeholder="Enter title"
                                   required={true}/>

                            <label>Self intro *</label>
                            <textarea onChange={change}
                                      rows = "5"
                                      cols = "60"
                                      type="text"
                                      name="selfintro"
                                      className="form-control"
                                      placeholder="Enter self Intro"
                                      required={true}
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
                                   required={true}
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
                                   required={true}
                            maxLength={200}/>

                            <button type="submit" className="btn border-dark text-center m-2">
                                <h3>CREATE PITCH</h3>
                            </button>

                        </Row>
                    </Form>
                </Col>

                <Col md={8}>
                    <div style={{
                        display:"grid",
                        gridTemplateColumns: "repeat(3, auto)",
                        gridGap: "1px",
                        margin: "2px"
                    }} >
                    {pitch.map((item,i) => (
                        <PitchItem item={item}
                                key ={i}/>
                    )) }
                    </div>
                </Col>

            </Row>


        </Container>
    )

///////////////////////////////////////////////
//////////this part is for recruiters//////////
 }else {
     return (
         <div>
             <h3> HELLO THIS IS A SPACE FOR RECRUITERS</h3>
             Welcome back, <strong className="text-danger">{user.name}</strong>, search pitch here

{/*<JobSeeker />*/}

         </div>
     )
 }
};
///////////////////////////////////////////////
export default Dashboard;

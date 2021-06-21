import React, {useEffect, useState} from 'react';
import axios from "axios";
import PitchItem from "../PitchItem";
import {Col, Container, Row} from "react-bootstrap";
import PitchItemRec from "./PitchItemRec";
import styles from "./DashboardRec.module.css"

function DashboardRec() {
    const [user, setUser] = useState({})
    const [pitches, setPitches] = useState([])
    const [search, setSearch] = useState("")

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

    useEffect(() => {
        async function getPitch() {
            let {data} = await axios.get('/pitch')
            if(data.pitches){
                setPitches(data.pitches)
            }else {
                setPitches(null)
            }
        }

        getPitch()
    }, [])


    return (
        <div>
            <h3> HELLO THIS IS A SPACE FOR RECRUITERS !!!!!!!!!</h3>
            Welcome back, <strong className="text-danger">{user.name}</strong>, search pitch here


            <div className={`${styles.split}`}>
                <div className={`${styles.allPitches}`}>
                    <input type="text" placeholder="Search Pitches" onChange={e => setSearch(e.target.value)}/>
                    <div style={{
                        display:"grid",
                        gridTemplateColumns: "repeat(3, auto)",
                        gridGap: "1px",
                        margin: "1px"
                    }} >
                        {pitches.filter(item => {
                            if (search === ""){
                                return item
                            }
                            else if (item.title.toLowerCase().includes(search.toLowerCase())){
                                return item
                            }
                        }).map((item,i) => (
                            <PitchItemRec item={item}
                                          key ={i}/>
                        )) }
                    </div>
                </div>

                {/*to display favourite pitches*/}
                <div className={`${styles.favPitches}`}>
                    <h2>Favourite Pitches</h2>
                    <div style={{
                        display:"grid",
                        gridTemplateColumns: "repeat(3, auto)",
                        gridGap: "1px",
                        margin: "1px"
                    }} >
                        {pitches.map((item,i) => (
                            <PitchItemRec item={item}
                                          key ={i}/>
                        )) }
                    </div>
                </div>
            </div>





            {/*<Row>*/}
            {/*    <Col md={4}>*/}
            {/*        <input type="text" placeholder="Search Pitches" onChange={e => setSearch(e.target.value)}/>*/}
            {/*        <div style={{*/}
            {/*            display:"grid",*/}
            {/*            gridTemplateColumns: "repeat(2, auto)",*/}
            {/*            gridGap: "1px",*/}
            {/*            margin: "1px"*/}
            {/*        }} >*/}
            {/*            {pitches.filter(item => {*/}
            {/*                if (search === ""){*/}
            {/*                    return item*/}
            {/*                }*/}
            {/*                else if (item.title.toLowerCase().includes(search.toLowerCase())){*/}
            {/*                    return item*/}
            {/*                }*/}
            {/*            }).map((item,i) => (*/}
            {/*                <PitchItemRec item={item}*/}
            {/*                           key ={i}/>*/}
            {/*            )) }*/}
            {/*        </div>*/}
            {/*    </Col>*/}

            {/*    <Col md={8}>*/}
            {/*        <h2>Favourite Pitches</h2>*/}
            {/*        <div style={{*/}
            {/*            display:"grid",*/}
            {/*            gridTemplateColumns: "repeat(3, auto)",*/}
            {/*            gridGap: "1px",*/}
            {/*            margin: "1px"*/}
            {/*        }} >*/}
            {/*            {pitches.map((item,i) => (*/}
            {/*                <PitchItemRec item={item}*/}
            {/*                              key ={i}/>*/}
            {/*            )) }*/}
            {/*        </div>*/}
            {/*    </Col>*/}
            {/*</Row>*/}


        </div>
    );
}

export default DashboardRec;

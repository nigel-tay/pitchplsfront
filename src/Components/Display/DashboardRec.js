import React, {useEffect, useState} from 'react';
import axios from "axios";
import PitchItem from "./PitchItem";
import {Col, Row} from "react-bootstrap";

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
    }, [user, pitches])


    return (
        <div>
            <h3> HELLO THIS IS A SPACE FOR RECRUITERS !!!!!!!!!</h3>
            Welcome back, <strong className="text-danger">{user.name}</strong>, search pitch here

            <Row>

                <Col md={6}>
                    <input type="text" placeholder="Search Pitches" onChange={e => setSearch(e.target.value)}/>
                    <div style={{
                        display:"grid",
                        gridTemplateColumns: "repeat(3, auto)",
                        gridGap: "1px",
                        margin: "2px"
                    }} >
                        {pitches.filter(item => {
                            if (search === ""){
                                return item
                            }
                            else if (item.title.toLowerCase().includes(search.toLowerCase())){
                                return item
                            }
                        }).map((item,i) => (
                            <PitchItem item={item}
                                       key ={i}/>
                        )) }
                    </div>
                </Col>
            </Row>


        </div>
    );
}

export default DashboardRec;

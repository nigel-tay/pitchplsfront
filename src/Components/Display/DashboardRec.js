import React, {useEffect, useState} from 'react';
import axios from "axios";
import PitchItemRec from "./PitchItemRec";
import {Col, Row, Container} from "react-bootstrap";
import FavouritePitches from "./FavouritePitches";

function DashboardRec() {
    const [user, setUser] = useState({})
    const [pitch, setPitch] = useState([])
    const [showFav, setShowFav] = useState([])
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
            let {data} = await axios.get(`/pitch`)
            setPitch(data.pitches)
        }

        getPitch()
    }, [user, pitch])


    useEffect(() => {
        async function getPitch() {
            let {data} = await axios.get(`/user/${user._id}`)
            // console.log("fav", data.user.favourites)
            if (data.user.favourites) {
                console.log(data.user.favourites)
                let unique = []
                data.user.favourites.forEach(item => {
                    if (!unique.includes(item)) {
                        unique.push(item)
                    }
                })
                console.log(unique)
                setShowFav(unique)
            } else {
                setShowFav(null)
            }
        }

        getPitch()
    }, [user, showFav])


    return (
        <Container fluid>
            <h3> HELLO THIS IS A SPACE FOR RECRUITERS !!!!!!!!!</h3>
            Welcome back, <strong className="text-danger">{user.name}</strong>, search pitch here
            <input type="text" placeholder="Search Pitches" onChange={e => setSearch(e.target.value)}/>
            <Row>
                <Col md={8}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, auto)",
                        gridGap: "1px",
                        margin: "1px",
                    }}>
                        {pitch.filter(item => {
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
                </Col>
                <Col md={4} className="bg-secondary">
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(1, auto)",
                        gridGap: "1px",
                        margin: "1px",
                    }}>
                        {showFav.map((item, i) => (
                            <FavouritePitches item={item}
                                              key={i}/>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default DashboardRec;

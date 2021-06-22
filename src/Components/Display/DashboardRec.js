import React, {useEffect, useState} from 'react';
import axios from "axios";
import PitchItemRec from "./PitchItemRec";
import {Col, Row, Container} from "react-bootstrap";
import FavouritePitches from "./FavouritePitches";
import styles from "./Dashboard.module.css"

function DashboardRec() {
    const [user, setUser] = useState({})
    const [pitch, setPitch] = useState([])
    const [showFav, setShowFav] = useState([])



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
                setShowFav(data.user.favourites.reverse())
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
            <Row>
                <Col md={9} className={`${styles.makeThisScroll} border border-2 border-dark`}>
                    <h4 className="mt-0 mb-3"> Search Pitches Here </h4>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, auto)",
                        gridGap: "1px",

                    }}>
                        {pitch.map((item, i) => (
                            <PitchItemRec item={item}
                                          key={i}
                            />


                        ))}

                    </div>
                </Col>
                <Col md={3} className={`${styles.backgroundCork} border border-dark border-2 py-3`}>
                    <h4 className="bg-light"> My Favourite Pitches</h4>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(1, auto)",
                        gridGap: "1px",

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

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
    const [search, setSearch] = useState("")
    const [searchFav, setSearchFav] = useState("")


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


            <Row>
                <Col md={9} className={`${styles.makeThisScroll} border border-2 border-dark`}>
                    <div style={{width: "100%",
                                marginBottom: "20px",
                        position: 'fixed',
                        zIndex: "100",
                        left: "31.5%"}}>
                    <img style={{width: "35px",
                                position: "absolute",
                                margin: "5px"}}
                                src="https://i.pinimg.com/originals/05/9b/ad/059bad28392cfadc21541a367b145e29.png" />
                    <input type="text" placeholder="Search Pitches"
                           className={`${styles.inputStyle} pl-3 text-center`}
                           onChange={e => setSearch(e.target.value)}/>
                    </div>
                        <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, auto)",
                        gridGap: "1px",
                        marginTop: "60px",

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
                <Col md={3} className={`${styles.backgroundCork} border border-dark border-2`}>

                    <h4 className="mt-3"> My Favourite Pitches</h4>
                    <input type="text" placeholder="Search Pitches"
                           className={`${styles.inputStyle} pl-3 text-center`}
                           onChange={e => setSearchFav(e.target.value)}/>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(1, auto)",
                        gridGap: "1px",
                        marginTop: "20px",

                    }}>

                        {showFav.filter(item => {
                            if (searchFav === ""){
                                return item
                            }
                            else if (item.title.toLowerCase().includes(searchFav.toLowerCase())){
                                return item
                            }
                        }).map((item, i) => (
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

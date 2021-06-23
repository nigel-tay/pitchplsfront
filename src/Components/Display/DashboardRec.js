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

    useEffect( () => {
        async function getPitch() {
            console.log('YOUR FATHAR')
            let {data} = await axios.get(`/pitch`)
            setPitch(data.pitches)
            // console.log("data", data)
        }
        getPitch()
    }, [user])


    useEffect( () => {
        async function getFavourites() {
            console.log('YOUR MATHER')
            let {data} = await axios.get(`/user/${user._id}`)
            // console.log("data",data)
            // console.log("fav", data.user.favourites)
            if (data.user.favourites) {
                setShowFav(data.user.favourites.reverse())
            } else {
                setShowFav(null)
            }
        }
        getFavourites()
    }, [user])
  //
  // useEffect( () => {
  //     getFavourites()
  //
  // }, [user])

// useEffect( () => {
    //
    //     getPitch()
    // }, [user])
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
                                          key={i}
                                          user={user}
                                          setShowFav={setShowFav}

                            />


                        ))}

                    </div>
                </Col>
                <Col md={3} className={`${styles.backgroundCork} border border-dark border-2`}>

                    <h4 className="mt-3"> My Favourite Pitches</h4>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(1, auto)",
                        gridGap: "1px",
                        marginTop: "20px",

                    }}>
                        {showFav.map((item, i) => (
                            <FavouritePitches
                                item={item}
                                key={i}
                                user={user}
                                setShowFav={setShowFav}

                            />
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default DashboardRec;

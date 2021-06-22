import React, {useRef} from 'react';
import {Col, Row, Form} from "react-bootstrap";
import styles from "./PitchItem.module.css"
import axios from "axios";

function FavouritePitches({item}) {
    const form = useRef(null)
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
                console.log(res.data)

            } catch (e) {
                console.log(e)
            }
        }
    }



    return (
        <div>
            <ul>
                <li style={{background: `${item.color}`}}>
                    {/*<a href="#">*/}
                    <Form ref={form} id="form" onSubmit={removeFav}>
                    <h4 className="font-monospace">
                        [[[ FAVE ]]] {item.title}</h4>
                    <span> usp: {item.usp}, </span>
                    <span>  {item.goals}, </span>
                    <span>  {item.selfintro}</span>
                    <Row className="justify-content-end"
                         style={{
                             position: "fixed",
                             width: "30%",
                             bottom: 0,
                             paddingBottom: 10
                         }}>
                        <button className="text-left" type="submit"> unfav</button>
                    </Row>
                    </Form>
                    {/*</a>*/}
                </li>
            </ul>
        </div>
    );
}

export default FavouritePitches;

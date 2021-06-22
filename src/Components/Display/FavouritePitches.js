import React from 'react';
import {Col, Row} from "react-bootstrap";
import styles from "./PitchItem.module.css"

function FavouritePitches({item}) {
    return (
        <div>
            <ul>
                <li style={{background: `${item.color}`}}>
                    {/*<a href="#">*/}

                    <h4 className="font-monospace">
                        [[[ FAVE ]]] {item.title}</h4>
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
                    </Row>

                    {/*</a>*/}
                </li>
            </ul>
        </div>
    );
}

export default FavouritePitches;

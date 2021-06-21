import React, {useState} from 'react';
import {Container, Card, Col, Row} from "react-bootstrap";
import styles from "./PitchItem.module.css"

function PitchItem({item}) {


    const handleClick=(e)=>{
        console.log("this is working fine");
        e.preventDefault();
        e.target.style.background = 'FFFFCCFF' ? 'pink' : 'FFFFCCFF'
        console.log(e.target);
    }


    return (


        <Row>

            <ul onClick={handleClick}>
                <li>
                    <a href="#">
                        <h4 className="font-monospace">{item.title}</h4>
                        <p> usp: {item.usp}, </p>
                        <p>  {item.goals}, </p>
                        <p>  {item.selfintro}</p>
                    </a>
                </li>
            </ul>



        </Row>






    );
}

export default PitchItem;

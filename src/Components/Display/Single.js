import React, {useState, useRef, useEffect} from 'react';
import axios from "axios";
import {Col, Form,Button,Overlay, Popover, Modal, Row} from "react-bootstrap";


function Single({msg}) {

    const [single, setSingle] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);


    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
        getSingle()
    };

    async function getSingle(){
        let {data} = await axios.get(`/pitch/${msg.pitchId}`)
        console.log(data.pitch)
        setSingle(data.pitch)

    }

    useEffect( () =>{
        getSingle()
    },[])

    return (

        <div ref={ref}
        // style={{left:"50%",bottom: "10%", position:"absolute"}}
        >


            {/*<button onClick={getSingle}>see pitch</button>*/}

                <Button className="bg-transparent  text-danger" onClick={handleClick}>[Click for Pitch Reference] </Button>

                <Overlay
                    show={show}
                    target={target}
                    placement="right"
                    container={ref.current}
                    containerPadding={10}
                >
                    <Popover id="popover-contained">
                        <Popover.Title as="h3">{single.title}</Popover.Title>
                        <Popover.Content>
                            <span>Self Intro: {single.selfintro}</span>
                            <span>USP: {single.usp}</span>
                            <span> GOALS :{single.goals}</span>
                            Comments: {single?.comments?.map(c => (
                           <span>{c.name} wrote {c.text}</span>
                        ))}
                        </Popover.Content>
                    </Popover>
                </Overlay>


            {/*<Modal*/}

            {/*    show={show}*/}
            {/*    onHide={handleClose}>*/}
            {/*    <div style={{ width: "30%"}}*/}
            {/*        className={`border border-dark border-2`}>*/}
            {/*        {single.title}*/}
            {/*        {single.selfintro}*/}
            {/*        {single.usp}*/}
            {/*        {single.goals}*/}
            {/*        {single.comments}*/}


            {/*    <button onClick={handleClose}> x </button>*/}
            {/*    </div>*/}
            {/*</Modal>*/}
        </div>

    );
}

export default Single;

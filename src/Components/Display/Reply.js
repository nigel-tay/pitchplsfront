import React, {useRef, useState} from 'react';
import axios from "axios";
import {Form, Row} from "react-bootstrap";

function Reply({msg, user}) {
    const [message, setMessage] = useState({sender: user._id, name: user.name, text: ""})
    const form = useRef(null)

    async function postMessage(e) {
        e.preventDefault()
        console.log(message)
        try{
            await axios.put(`/user/messages/${msg.sender}`, message);
            // alert('Pitch Edited!');

        }catch (e) {
            console.log(e.response)
        }
    }


    function changeMessage(e) {
        setMessage(prevState => ({...prevState, [e.target.name]: e.target.value}))
        console.log(message)
        // console.log("item", item)
    }

    return (
        <div>

            <h5 className="px-3">{msg.name} said: <p className="text-success">{msg.text}</p>  </h5>

            <Form ref={form} id="form" onSubmit={postMessage} method="post">
                <Row className="justify-content-center mx-2">
                    <label>Message * </label>

                    <textarea onChange={changeMessage}
                              type="text"
                              name="text"
                              rows = "2"
                              cols = "30"
                              className="form-control"
                              aria-describedby="Enter title"
                              placeholder="Enter title"
                    />

                    <button type="submit" className="btn border-dark text-center m-2">
                        <h3>Message!</h3>
                    </button>
                    {/*My Messages:*/}
                    {/*<button onClick={getMessage}> Load Messages</button>*/}
                </Row>
            </Form>
        </div>
    );
}

export default Reply;

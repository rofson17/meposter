import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";


const SingIn = ({ dispatch }) => {
    const [value, setValue] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const inputEvent = event => {
        const { name, value } = event.target;
        setValue(preValue => {
            return {
                ...preValue, [name]: value
            };
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const { email, password } = value;
        if (!email || !password) {
            alert("Please Enter email and password");
            return;
        }

        let response = await fetch("/singin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        });

        if (response.status === 200) {
            setValue({
                email: "", password: ""
            });
            dispatch({ type: "LOGIN" })
            navigate("/");
        } else {
            const res = await response.json();
            alert(res['message']);
        }
    }

    return (

        <Container style={{ height: "90vh", width: "100vw" }} >
            <div className="d-flex justify-content-center align-items-center flex-column " style={{ width: "100%", height: "100%" }}>
                <h2 className="text-center text-primary text-capitalize">sing in</h2>
                <Form style={{ width: "70%" }} onSubmit={submitForm} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" onChange={inputEvent} value={value.email} name="email" placeholder="Enter email" style={{ borderRadius: "0px" }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={inputEvent} value={value.password} placeholder="Password" style={{ borderRadius: "0px" }} />
                    </Form.Group>
                    <Button variant="success" type="submit" style={{ borderRadius: "0px" }} >
                        <BiUser /> Sing In
                    </Button>

                </Form>

            </div >
        </Container >
    )
}

export default SingIn;
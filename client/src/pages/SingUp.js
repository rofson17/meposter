import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { BiUserPlus } from "react-icons/bi"


const SingUp = () => {
    const [value, setValue] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        conformPassword: ''
    });

    const [isMatchPass, setMatchPass] = useState(true);


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

        const { name, email, phoneNumber, password, conformPassword } = value;

        if (!name || !email || !phoneNumber || !password || !conformPassword) {
            alert("Please fill all input fields");
            return;
        }
        if (password !== conformPassword) {
            setValue({
                password: '', conformPassword: ''
            })
            setMatchPass(false);
        } else {
            setMatchPass(true);

            const response = await fetch("/singup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, email, phoneNumber, password, conformPassword
                })
            });

            if (response.status === 200) {
                setValue({
                    name: '', email: '', phoneNumber: '', password: '', conformPassword: ''
                })
                navigate("/singin");
            } else {
                const resJson = await response.json();
                alert(resJson['message']);
            }
        }
    }

    return (
        <Container style={{ width: "100vw" }} >
            <div className="d-flex justify-content-center align-items-center flex-column " style={{ width: "100%", height: "100%" }}>

                <h2 className="text-center text-primary text-capitalize mt-5">sing in</h2>

                <Form style={{ width: "70%" }} onSubmit={submitForm} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" onChange={inputEvent} value={value.name} style={{ borderRadius: "0px" }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" onChange={inputEvent} value={value.email} style={{ borderRadius: "0px" }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="number" name="phoneNumber" onChange={inputEvent} value={value.phoneNumber} style={{ borderRadius: "0px" }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={inputEvent} value={value.password} style={{ borderRadius: "0px" }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Conform Password</Form.Label>
                        <Form.Control type="password" name="conformPassword" onChange={inputEvent} value={value.conformPassword} style={{ borderRadius: "0px" }} />

                        <Form.Text className={`text-danger ${isMatchPass ? "d-none" : "d-block"}`} >
                            Password don't match
                        </Form.Text>

                    </Form.Group>

                    <Button variant="primary" type="submit">
                        <BiUserPlus /> Sing Up
                    </Button>

                </Form>

            </div >
        </Container >
    )
}

export default SingUp;
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

import { MdOutlineContacts } from "react-icons/md"
import { useNavigate } from "react-router-dom";

const Contact = () => {
    document.title = "Me Poster -Contact"
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const inputEvent = e => {
        const { name, value } = e.target;
        setInputValue(preValue => {
            return {
                ...preValue, [name]: value
            }
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const { name, email, subject, message } = inputValue;
        if (!name || !email || !subject || !message) {
            alert("Pleass fill all fields");
            return;
        }

        let response = await fetch("/contact", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, subject, message
            })
        });

        if (response.status === 200) {
            setInputValue({
                name: '', email: '', subject: '', message: ''
            })
            navigate("/");
        } else {
            const res = await response.json();
            alert(res['message']);
        }
    }


    return (
        <Container className="mt-lg-5">
            <h2 className="text-prmary text-center ">Contact Us</h2>

            <Form onSubmit={submitForm}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={inputValue.name} onChange={inputEvent} placeholder="Enter your name" style={{ borderRadius: "0px" }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>email</Form.Label>
                    <Form.Control type="text" name="email" value={inputValue.email} onChange={inputEvent} placeholder="Enter your email" style={{ borderRadius: "0px" }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" name="subject" value={inputValue.subject} onChange={inputEvent} placeholder="subject" style={{ borderRadius: "0px" }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="descripotion">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" name="message" value={inputValue.message} onChange={inputEvent} rows={3} style={{ borderRadius: "0px" }} />
                </Form.Group>

                <Button type="submit" variant="primary">
                    <MdOutlineContacts /> Submit
                </Button>

            </Form>

        </Container>
    )
}

export default Contact;
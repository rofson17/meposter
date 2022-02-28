import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

import { MdAddToPhotos } from "react-icons/md"

const Uploader = ({ author, newPost }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputValue, setInputValue] = useState({
        title: '',
        description: ''
    });

    const inputEvent = e => {
        const { name, value } = e.target;
        setInputValue(preValue => {
            return {
                ...preValue, [name]: value
            }
        })
    }

    const submitForm = async () => {
        handleClose();
        const { title, description } = inputValue;
        if (!title || !description) {
            alert("Please Enter a title and description");
            return;
        }

        const response = await fetch("/posts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, description, author
            })
        });
        if (response.status === 400)
            alert("Error! Please try again after few minutes");
        else {
            setInputValue({
                title: "",
                description: ""
            })
            setShow(false);
        }

    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow} style={{ borderRadius: "0px" }}>
                <MdAddToPhotos />  Add
            </Button >

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={inputValue.title} onChange={inputEvent} placeholder="Enter the title" style={{ borderRadius: "0px" }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="descripotion">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" value={inputValue.description} onChange={inputEvent} rows={3} style={{ borderRadius: "0px" }} />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <div onClick={newPost} >
                        <Button variant="primary" onClick={submitForm}>
                            post
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Uploader
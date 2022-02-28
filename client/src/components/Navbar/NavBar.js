import React from "react";

import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const NavBar = ({ state, dispatch }) => {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Me Poster</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to="/" activeClassName="active">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/posts" activeClassName="active">Posts</Nav.Link>
                            {!state &&
                                <>
                                    <Nav.Link as={NavLink} to="/singup" activeClassName="active">SingUp</Nav.Link>
                                    <Nav.Link as={NavLink} to="/singin" activeClassName="active">SingIn</Nav.Link>
                                </>
                            }

                            <Nav.Link as={NavLink} to="/contact" activeClassName="active">Contact</Nav.Link>
                            {state &&
                                <Button onClick={() => {
                                    fetch("/logout").then(() =>
                                        dispatch({ type: "LOGOUT" })
                                    ).catch(err => console.log(err))
                                }
                                } >LogOut</Button>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
};

export default NavBar;
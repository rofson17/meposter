import React from "react";
import { Container, } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { MdHome, MdContacts } from "react-icons/md";

const Error404 = () => {
    document.title = "Me Poster -Contact"

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center flex-column text-center" style={{ height: "90vh", width: "100vw" }}>


                <h2 className="text-capitalize">404 Error - page not found :(</h2>
                <h4 className="text-secondary">The page your are searching isn't exist!</h4>
                <div className="d-flex justify-content-around mt-4" style={{ width: "80%" }}>
                    <NavLink className="btn btn-dark" style={{ borderRadius: "0px" }} to="/"><MdHome /> Home </NavLink>
                    <NavLink className="btn btn-dark" style={{ borderRadius: "0px" }} to="/contact"><MdContacts /> Contact</NavLink>
                </div>
            </Container>

        </>
    )
}

export default Error404;
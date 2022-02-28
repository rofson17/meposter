import React from "react";
import { Container, Row, Button, } from "react-bootstrap";
import { BiUserPlus, BiUser } from "react-icons/bi"
import { useNavigate } from "react-router-dom";

import HomeImage from "../images/Home.jpg";

const Home = () => {
    const navigator = useNavigate();

    document.title = "Me Poster -Home"
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center flex-column" style={{ height: "80vh", width: "100vw" }}>
                <Row>
                    <div className="col-12 col-lg-6 order-2 order-lg-1 mt-5">
                        <div className="d-flex justify-content-center align-items-center flex-column " style={{ height: "100%", width: "100%" }}>
                            <h2 className="text-primary text-center">This is Title</h2>
                            <h4 className="text-secondary text-center">This is a short description for this webside</h4>
                            <div className="d-flex justify-content-around mt-4" style={{ width: "100%" }}>
                                <Button style={{ borderRadius: "0px" }} onClick={() => navigator("/singup")} variant="outline-primary"><BiUserPlus /> Sing up</Button>
                                <Button style={{ borderRadius: "0px" }} onClick={() => navigator("/singin")} variant="outline-success" > <BiUser /> Sing in</Button>
                            </div>
                        </div>
                    </div >
                    <div className="col-12 col-lg-6 order-1 order-lg-2 mt-5">
                        <img src={HomeImage} className="img-fluid " style={{ borderRadius: '1rem', boxShadow: "3px 4px 8px #A59CA5" }} alt="Home " />
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default Home;
import React from "react";

import { Card } from "react-bootstrap";
import "./Cards.css";


const Cards = ({ title, author, description, time = "12.00pm" }) => {
    return (
        <div className="col-lg-6 col-md-12">

            <Card className="mb-3 card-container" style={{ borderRadius: "0px" }}>
                <Card.Body>
                    <Card.Title className="text-primary" >{title}</Card.Title>
                    <Card.Text >
                        {description}
                    </Card.Text>
                    <footer className="blockquote-footer">{author}  <span className="text-primary">{time}</span> </footer>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Cards;
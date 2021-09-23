import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import TicketModal from "../components/modal/TicketModal";
import TicketsDataTable from "../components/tables/TicketsDataTable";

const Tickets = () => {
    const [items, setItems] = useState([]);

    const getItems = () => {
        fetch("http://localhost:3000/tickets/all-tickets")
            .then((response) => response.json())
            .then((items) => setItems(items))

            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getItems();
    }, []);
    return (
        <Container className="App">
            <Row>
                <Col>
                    <h1>TODO'S</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TicketsDataTable items={items} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TicketModal buttonLabel={"Nuevo ticket"} />
                </Col>
            </Row>
        </Container>
    );
};

export default Tickets;

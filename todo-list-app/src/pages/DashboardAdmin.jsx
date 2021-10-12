import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import TicketModal from "../components/modal/TicketModal";
import TicketsDataTable from "../components/tables/TicketsDataTable";

const DashboardAdmin = () => {
    let user = localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser")).managerId
        : "";
    const [items, setItems] = useState([]);

    const getItems = () => {
        fetch("http://localhost:3000/api/dashboard")
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
                    <h1>EQUIPO DE ATENCION AL CLIENTE</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TicketsDataTable adminId={user} items={items} />
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardAdmin;

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import UsersModal from "../components/modal/UsersModal";
import UsersDataTable from "../components/tables/UsersDataTable";

const Users = () => {
    const [items, setItems] = useState([]);

    const getItems = () => {
        fetch("http://localhost:3000/users/all-users")
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
                    <h1>USUARIOS</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <UsersDataTable items={items} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <UsersModal buttonLabel={"Nuevo usuario"} />
                </Col>
            </Row>
        </Container>
    );
};

export default Users;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import EmployeeTicketsDataTable from "../components/tables/EmployeeTicketsDataTable";
import { useAuthDispatch, logout } from "../context";

const DashboardEmployees = (props) => {
    let user = localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser")).managerId
        : "";
    const { id, role } = useParams();
    const dispatch = useAuthDispatch();
    const [items, setItems] = useState([]);

    const handleBack = () => {
        props.history.push("/staff");
    };

    const handleLogout = () => {
        logout(dispatch); //invoca al disparo de logout

        props.history.push("/login"); //navegamos al login cuando cerramos sesion
    };

    const getItems = () => {
        fetch(`http://localhost:3000/api/dashboard/user-tickets/${id}`)
            .then((response) => response.json())
            .then((items) => setItems(items))

            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getItems();
    }, []);
    return (
        <Container className="App">
            {items.length == 0 && role == "employee" ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <h2>Un administrador aun no te asignado tickets</h2>
                    <Button onClick={handleLogout}>Cerrar sesion</Button>
                </div>
            ) : (
                <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <h1>LISTA DE TICKETS</h1>
                        <Button
                            style={{ display: role == "employee" && "none" }}
                            onClick={handleBack}
                        >
                            REGRESAR
                        </Button>
                    </div>

                    <Row>
                        <Col>
                            <EmployeeTicketsDataTable
                                role={role}
                                employeeId={id}
                                adminId={user}
                                items={items}
                            />
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default DashboardEmployees;

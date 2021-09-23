import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Table } from "reactstrap";
import TicketModal from "../modal/TicketModal";
import { useAuthDispatch, logout } from "../../context";
const moment = require("moment");

const TicketsDataTable = (props) => {
    const dispatch = useAuthDispatch(); // Lee el metodo dispatch del contexto
    const handleLogout = () => {
        logout(dispatch); //invoca al disparo de logout

        props.history.push("/login"); //navegamos al login cuando cerramos sesion
    };
    const items = props.items.map((item) => (
        <tr>
            <th scope="row">{item.ticket_id}</th>
            <td>{item.description}</td>
            <td>{item.status}</td>
            <td>{item.userticket_id}</td>
            <td>{moment(item.created_at).format("LL")}</td>
            <td>
                <div style={{ width: "110px" }}>
                    <TicketModal buttonLabel={"Editar"} item={item} />
                </div>
                <Button
                    color="danger"
                    onClick={() => console.log("Eliminar elemento")}
                >
                    Eliminar
                </Button>
            </td>
        </tr>
    ));

    return (
        <>
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DESCRIPCION</th>
                        <th>ESTADO</th>
                        <th>ID USUARIO</th>
                        <th>FECHA</th>
                        <th>OPCIONES</th>
                    </tr>
                </thead>
                <tbody>{items}</tbody>
            </Table>
            <Button onClick={handleLogout}>Cerrar sesion</Button>
        </>
    );
};

export default withRouter(TicketsDataTable);

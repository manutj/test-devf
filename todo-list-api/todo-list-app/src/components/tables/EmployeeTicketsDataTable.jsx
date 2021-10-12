import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button, Table } from "reactstrap";
import TicketModal from "../modal/TicketModal";
import { useAuthDispatch, logout } from "../../context";
const moment = require("moment");

const TicketsDataTable = (props) => {
    let isActive = 0;
    const disabledButton = isActive >= 5;
    const disabled = props.items.length >= 5;
    const dispatch = useAuthDispatch(); // Lee el metodo dispatch del contexto
    const handleLogout = () => {
        logout(dispatch); //invoca al disparo de logout

        props.history.push("/login"); //navegamos al login cuando cerramos sesion
    };

    const items = props.items.map((item) => {
        let opacity = 1;
        let display = "";
        if (item.status == "Cerrado") opacity = 0.5;
        item.is_active ? (isActive = isActive + 1) : (display = "none");
        return (
            <tr>
                <th scope="row">{item.ticket_id}</th>
                <td style={{ opacity: opacity }}>{item.description}</td>
                <td style={{ opacity: opacity }}>{item.status}</td>
                <td style={{ opacity: opacity }}>
                    {moment(item.created_at).format("LL")}
                </td>
                <td style={{ display: "flex" }}>
                    <div
                        style={{ display: props.role == "employee" && "none" }}
                    >
                        <TicketModal buttonLabel={"Editar"} item={item} />
                    </div>
                    <div>
                        <TicketModal buttonLabel={"Configurar"} item={item} />
                    </div>
                    <div
                        style={{ display: props.role == "employee" && "none" }}
                    >
                        <TicketModal buttonLabel={"Eliminar"} item={item} />
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <>
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DESCRIPCION</th>
                        <th>ESTADO</th>
                        <th>FECHA DE INICIO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>{items}</tbody>
            </Table>
            <div style={{ display: props.role == "employee" && "none" }}>
                <TicketModal
                    adminId={props.adminId}
                    employeeId={props.employeeId}
                    disabled={disabled}
                    item={{ ticket_id: null, description: "", status: "" }}
                    buttonLabel={"Agregar ticket"}
                />
            </div>
            <Button onClick={handleLogout}>Cerrar sesion</Button>
        </>
    );
};

export default withRouter(TicketsDataTable);

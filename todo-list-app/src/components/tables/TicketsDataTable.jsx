import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { useAuthDispatch, logout } from "../../context";
import TicketModal from "../modal/TicketModal";

const TicketsDataTable = (props) => {
    const dispatch = useAuthDispatch(); // Lee el metodo dispatch del contexto
    const handleLogout = () => {
        logout(dispatch); //invoca al disparo de logout

        props.history.push("/login"); //navegamos al login cuando cerramos sesion
    };

    const items = props.items.map((item) => {
        return (
            <tr key={item.employee_id}>
                <td>{item.name}</td>
                <td>
                    <div>{item.num_tickets}</div>
                </td>
                <td>
                    {item.num_tickets == 0 ? (
                        <TicketModal
                            employeeId={item.employee_id}
                            adminId={props.adminId}
                            item={{
                                ticket_id: null,
                                description: "",
                                status: "",
                            }}
                            color={"warning"}
                            buttonLabel={"Agregar ticket"}
                        />
                    ) : (
                        <Button
                            color="success"
                            onClick={() =>
                                props.history.push(
                                    `/staff-tickets/${item.employee_id}/admin`
                                )
                            }
                        >
                            Ver tickets
                        </Button>
                    )}
                </td>
            </tr>
        );
    });
    return (
        <>
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>EMPLEADO</th>
                        <th>TICKETS ASIGNADOS</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>{items}</tbody>
            </Table>
            <Button onClick={handleLogout}>Cerrar sesion</Button>
        </>
    );
};

export default withRouter(TicketsDataTable);

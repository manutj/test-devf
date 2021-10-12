import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Table } from "reactstrap";
import UsersModal from "../modal/UsersModal";
import { useAuthDispatch, logout } from "../../context";

const UsersDataTable = (props) => {
    const dispatch = useAuthDispatch(); // Lee el metodo dispatch del contexto
    const handleLogout = () => {
        logout(dispatch); //invoca al disparo de logout

        props.history.push("/login"); //navegamos al login cuando cerramos sesion
    };
    const items = props.items.map((item) => (
        <tr>
            <th scope="row">{item.user_id}</th>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>
                <div style={{ width: "110px" }}>
                    <UsersModal buttonLabel={"Editar"} item={item} />
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
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>{items}</tbody>
            </Table>
            <Button onClick={handleLogout}>Cerrar sesion</Button>
        </>
    );
};

export default withRouter(UsersDataTable);

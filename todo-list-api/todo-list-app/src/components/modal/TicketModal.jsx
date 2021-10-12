import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import AddEditTicketForm from "../forms/AddEditTicketForm";

const TicketModal = (props) => {
    const [toggle, setToggle] = useState(false);

    const modal = () => {
        setToggle(!toggle);
    };
    const closeModal = (
        <button onClick={modal} className="close">
            &times;
        </button>
    );

    const label = props.buttonLabel;
    let button = "";
    let title = "";

    if (label === "Editar") {
        button = (
            <Button
                color="warning"
                onClick={modal}
                style={{ float: "left", marginRight: "10px" }}
            >
                {label}
            </Button>
        );
        title = "Editar ticket";
    } else if (label === "Configurar") {
        button = (
            <Button
                color="primary"
                onClick={modal}
                style={{ float: "left", marginRight: "10px" }}
            >
                {label}
            </Button>
        );
        title = "Cambiar estado";
    } else if (label === "Eliminar") {
        button = (
            <Button
                color="danger"
                onClick={modal}
                style={{ float: "left", marginRight: "10px" }}
            >
                {label}
            </Button>
        );
        title = "Eliminar ticket";
    } else {
        button = (
            <Button
                disabled={props.disabled}
                color={props.color ? props.color : "success"}
                onClick={modal}
                style={{ float: "left", marginRight: "10px" }}
            >
                {label}
            </Button>
        );

        title = "Nuevo ticket";
    }

    return (
        <>
            {button}
            <div>
                <Modal isOpen={toggle} toggle={modal}>
                    <ModalHeader toggle={modal} close={closeModal}>
                        {title}
                    </ModalHeader>
                    <ModalBody>
                        <AddEditTicketForm
                            label={props.buttonLabel}
                            item={props.item}
                            adminId={props.adminId}
                            employeeId={props.employeeId}
                        />
                    </ModalBody>
                </Modal>
            </div>
        </>
    );
};

export default TicketModal;

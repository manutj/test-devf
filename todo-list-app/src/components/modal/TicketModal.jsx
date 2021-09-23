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
    } else {
        button = (
            <Button
                color="success"
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
                        <AddEditTicketForm item={props.item} />
                    </ModalBody>
                </Modal>
            </div>
        </>
    );
};

export default TicketModal;

import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const AddEditTicketForm = (props) => {
    const { ticket_id, description, status } = props.item;
    const [valueSelect, setValueSelect] = useState("");
    const [form, setForm] = useState({
        ticket_id: "",
        description: "",
        status: "",
    });
    const [items, setItems] = useState([
        { id: 1, state: "Abierto" },
        { id: 2, state: "En proceso" },
        { id: 3, state: "Cerrado" },
    ]);

    useEffect(() => {
        setForm({ ticket_id, description, status });
    }, []);

    const handleSelect = (e) => {
        setValueSelect(e.target.value);
        setForm({
            ...form.status,
            [e.target.name]: e.target.value,
        });
    };

    const onChangeDescription = (e) => {
        setForm({
            ...form.description,
            [e.target.name]: e.target.value,
        });
    };

    const states = items.map((item) => (
        <option key={item.id} onChange={handleSelect} value={item.state}>
            {item.state}
        </option>
    ));

    const submitFormAdd = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/api/dashboard/new-ticket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: form.description,
                employee_id: props.employeeId,
                manager_id: props.adminId,
            }),
        })
            .then((response) => response.json())
            .catch((err) => console.log(err));
    };

    const submitFormEdit = (e) => {
        e.preventDefault();
        props.label == "Editar"
            ? fetch(
                  `http://localhost:3000/api/dashboard/update-ticket/${ticket_id}`,
                  {
                      method: "PATCH",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                          description: form.description,
                      }),
                  }
              )
                  .then((response) => response.json())
                  .catch((err) => console.log(err))
            : props.label == "Configurar"
            ? fetch(
                  `http://localhost:3000/api/dashboard/change-ticket-status/${ticket_id}`,
                  {
                      method: "PATCH",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                          status: form.status,
                      }),
                  }
              )
                  .then((response) => response.json())
                  .catch((err) => console.log(err))
            : fetch(
                  `http://localhost:3000/api/dashboard/delete-ticket/${ticket_id}`,
                  {
                      method: "DELETE",
                      headers: {
                          "Content-Type": "application/json",
                      },
                  }
              )
                  .then((response) => response.json())
                  .catch((err) => console.log(err));
    };

    return (
        <div>
            <Form onSubmit={ticket_id == null ? submitFormAdd : submitFormEdit}>
                {props.label == "Editar" || props.label == "Agregar ticket" ? (
                    <FormGroup style={{ marginBottom: "10px" }}>
                        <Label for={"description"}>Descripcion</Label>
                        <Input
                            value={
                                form.description === null
                                    ? " "
                                    : form.description
                            }
                            onChange={onChangeDescription}
                            type={"text"}
                            id={"description"}
                            name={"description"}
                        />
                    </FormGroup>
                ) : props.label == "Configurar" ? (
                    <FormGroup style={{ marginTop: "10px" }}>
                        <Input
                            defaultValue={"Abierto"}
                            value={valueSelect}
                            onChange={handleSelect}
                            type="select"
                            name="status"
                            id="status"
                        >
                            {states}
                        </Input>
                    </FormGroup>
                ) : (
                    <p>Estas seguro de eliminar el ticket?</p>
                )}
                {props.label == "Editar" ||
                props.label == "Configurar" ||
                props.label == "Agregar ticket" ? (
                    <Button style={{ marginTop: "15px" }}>Guardar</Button>
                ) : (
                    <Button style={{ marginTop: "15px" }}>
                        Eliminar definitivamente
                    </Button>
                )}
            </Form>
        </div>
    );
};

export default AddEditTicketForm;

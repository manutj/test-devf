import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const AddEditTicketForm = (props) => {
    const [items, setItems] = useState([]);
    const [valueSelect, setValueSelect] = useState();
    useEffect(() => {
        fetch("http://localhost:3000/users/all-users")
            .then((response) => response.json())
            .then((items) => setItems(items))

            .catch((err) => console.log(err));
        if (props.item) {
            const { ticket_id, description, status } = props.item;
            setForm({ ticket_id, description, status });
        }
    }, []);

    console.log(valueSelect);

    const handleSelect = (e) => {
        console.log("Fruit Selected!!");
        setValueSelect(e.target.value);
    };

    const [form, setForm] = useState({
        description: "",
        status: "",
    });

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const users = items.map((item) =>
        item.is_active == false ? null : (
            <option onChange={handleSelect} value={item.user_id}>
                {item.name}
            </option>
        )
    );

    const submitFormAdd = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/tickets/new-ticket", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: form.description,
                userticket_id: valueSelect,
            }),
        })
            .then((response) => response.json())
            .catch((err) => console.log(err));
    };

    const submitFormEdit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/update-ticket/", {
            method: "patch",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: form.description,
                status: form.status,
                userticket_id: valueSelect,
            }),
        })
            .then((response) => response.json())
            .then((item) => {
                if (Array.isArray(item)) {
                    // console.log(item[0])
                    this.props.updateState(item[0]);
                    this.props.toggle();
                } else {
                    console.log("failure");
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
                <FormGroup style={{ marginBottom: "10px" }}>
                    <Label for={"description"}>Descripcion</Label>
                    <Input
                        value={
                            form.description === null ? " " : form.description
                        }
                        onChange={onChange}
                        type={"text"}
                        id={"description"}
                        name={"description"}
                    />
                </FormGroup>
                {form.status === "" ? (
                    <></>
                ) : (
                    <FormGroup>
                        <Label for={"status"}>Estado</Label>
                        <Input
                            value={form.status}
                            onChange={onChange}
                            type={"text"}
                            id={"status"}
                            name={"status"}
                        />
                    </FormGroup>
                )}

                <FormGroup style={{ marginTop: "10px" }}>
                    <Label for="userSelect">Usuario</Label>
                    <Input
                        value={valueSelect}
                        onChange={handleSelect}
                        type="select"
                        name="select"
                        id="userSelect"
                    >
                        {users}
                    </Input>
                </FormGroup>
                <Button style={{ marginTop: "15px" }}>Guardar</Button>
            </Form>
        </div>
    );
};

export default AddEditTicketForm;

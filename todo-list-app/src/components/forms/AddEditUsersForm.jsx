import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const AddEditUsersForm = (props) => {
    useEffect(() => {
        if (props.item) {
            const { id, name, email } = props.item;
            setForm({ id, name, email });
        }
    }, []);

    const [form, setForm] = useState({
        name: "",
        email: "",
    });

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <Form>
                <FormGroup>
                    <Label for={"name"}>Nombre</Label>
                    <Input
                        value={form.name === null ? " " : form.name}
                        onChange={onChange}
                        type={"text"}
                        id={"name"}
                        name={"name"}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for={"email"}>Correo</Label>
                    <Input
                        value={form.email === null ? " " : form.email}
                        onChange={onChange}
                        type={"text"}
                        id={"email"}
                        name={"email"}
                    />
                </FormGroup>
                <Button style={{ marginTop: "5px" }}>Guardar</Button>
            </Form>
        </div>
    );
};

export default AddEditUsersForm;

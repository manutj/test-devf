import React, { useState } from "react";
import { signupUser, useAuthState, useAuthDispatch } from "../context";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const dispatch = useAuthDispatch();
    const { loading, errorMessage } = useAuthState();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            let response = await signupUser({
                name,
                email,
                password,
                role,
            }); //La accion de login user hace la peticion mediante el metodo de envio que le dice el dispatch, envia en un objeto los datos de inicio de sesion y maneja los cambios de estado
            props.history.push("/login");
            alert("Usuario registrado");
        } catch (error) {
            alert("No se pudo registrar al usuario");
        }
    };
    return (
        <div className="loginBox">
            <h1>Registro</h1>
            <Form>
                <FormGroup>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nombre"
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup
                    style={{
                        marginTop: "10px",
                    }}
                >
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Correo"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup
                    style={{
                        marginTop: "10px",
                    }}
                >
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup
                    check
                    style={{
                        marginTop: "10px",
                    }}
                >
                    <Label check>
                        <Input
                            value="admin"
                            type="radio"
                            name="radio1"
                            id="admin"
                            onChange={(e) => setRole(e.target.value)}
                        />{" "}
                        Administrador
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input
                            value="employee"
                            type="radio"
                            name="radio1"
                            id="employee"
                            onChange={(e) => setRole(e.target.value)}
                        />{" "}
                        Empleado
                    </Label>
                </FormGroup>
                <Button onClick={handleLogin} className="signUpSubmit">
                    Registrar
                </Button>
            </Form>
        </div>
    );
};

export default Signup;

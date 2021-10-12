import React, { useState } from "react";
import { loginUser, useAuthState, useAuthDispatch } from "../context";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

function Login(props) {
    // Estados para almacenar los datos introducidos en los input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const dispatch = useAuthDispatch(); //Obtenemos el metodo de envio desde este hook personalizado
    const { loading, errorMessage } = useAuthState(); //Leemos los valores de carga y error desde el contexto

    // ESTA FUNCION MANEJA EL ENVIO DE LOS DATOS HACIA EL SERVIDOR
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            let response = await loginUser(dispatch, { email, password, role }); //La accion de login user hace la peticion mediante el metodo de envio que le dice el dispatch, envia en un objeto los datos de inicio de sesion y maneja los cambios de estado
            response.token ? alert("Logged") : alert("Fail credentials");
            role == "admin"
                ? props.history.push("/staff")
                : props.history.push(
                      `/staff-tickets/${response.employeeId}/${role}`
                  );
        } catch (error) {
            alert("Credenciales no validas");
        }
    };
    return (
        <div className="loginBox">
            <h1>Iniciar sesion</h1>
            <div>
                <div>
                    <Form>
                        <FormGroup style={{ marginBottom: "15px" }}>
                            <Input
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                placeholder="Correo"
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                placeholder="Contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
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
                                    type="radio"
                                    id="admin"
                                    name="radio1"
                                    disabled={loading}
                                    value="admin"
                                    onChange={(e) => setRole(e.target.value)}
                                />{" "}
                                Administrador
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="radio"
                                    id="employee"
                                    name="radio1"
                                    value="employee"
                                    disabled={loading}
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                    }}
                                />{" "}
                                Empleado
                            </Label>
                        </FormGroup>
                    </Form>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Button
                    style={{
                        marginTop: "10px",
                    }}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    Ingresar
                </Button>
            </div>
        </div>
    );
}

export default Login;

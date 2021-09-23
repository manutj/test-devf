import React, { useState } from "react";
import { loginUser, useAuthState, useAuthDispatch } from "../context";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

function Login(props) {
    // Estados para almacenar los datos introducidos en los input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAuthDispatch(); //Obtenemos el metodo de envio desde este hook personalizado
    const { loading, errorMessage } = useAuthState(); //Leemos los valores de carga y error desde el contexto

    // ESTA FUNCION MANEJA EL ENVIO DE LOS DATOS HACIA EL SERVIDOR
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            let response = await loginUser(dispatch, { password, email }); //La accion de login user hace la peticion mediante el metodo de envio que le dice el dispatch, envia en un objeto los datos de inicio de sesion y maneja los cambios de estado
            console.log("RESPUESTA!!", response);
            if (!response.role) return; //Verifica si existe la propiedad role del usuario
            props.history.push("/tickets"); //Si es asi, Navegamos al dashboard
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div>
                <h1 style={{ textAlign: "center" }}>Login</h1>
                <form>
                    <div>
                        <div>
                            <Form>
                                <FormGroup style={{ marginBottom: "15px" }}>
                                    <Label for="email">Username</Label>
                                    <Input
                                        type="text"
                                        id="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        disabled={loading}
                                    />
                                </FormGroup>
                                <Label for="password">Password</Label>
                                <FormGroup>
                                    <Input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        disabled={loading}
                                    />
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
                </form>
            </div>
        </div>
    );
}

export default Login;

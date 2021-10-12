//EN ESTE ARCHIVO DECLARAMOS LAS POSIBLES ACCIONES QUE PUEDE HACER UN USUARIO PARA ACTUALIZAR SU ESTADO EN LA APLICACION
//LA FUNCION LOGINUSER TIENE  UN OBJETO REQUESTOPTIONS CON LA CONFIGURACION PARA ENVIAR LOS DATOS DE INICIO DE SESION AL SERVIDOR

export async function loginUser(dispatch, loginPayload) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload),
    };

    //EL USUARIO MEDIANTE LA INTERACCION PUEDE DESENCADENAR ACCIONES (DISPATCH) DE DIFERENTE TIPO:

    // REQUEST_LOGIN: CUANDO SE HACE CLICK AL BOTON LOGIN, DESENCADENA LA ACCION DE ENVIO DE DATOS AL SERVIDOR
    // LOGIN_SUCCESS: SI EL USUARIO ES CORRECTO, RECIBE UNA RESPUESTA DEL SERVIDOR EXITOSA CON LOS DATOS DE USUARIO Y EL TOKEN PARA SER ALMACENADOS EN EL LOCAL STORAGE
    // LOGIN_ERROR: CAPTURA EL MENSAJE DE ERROR PARA MOSTRARLO AL USUARIO EN CASO DE QUE LOS DATOS INGRESADOS SEAN INCORRECTOS
    try {
        dispatch({ type: "REQUEST_LOGIN" });
        let response = await fetch(
            "https://todo-fs.herokuapp.com/api/login",
            requestOptions
        );
        let data = await response.json();
        if (data) {
            dispatch({ type: "LOGIN_SUCCESS", payload: data });
            localStorage.setItem("currentUser", JSON.stringify(data));
            console.log("DATA USER", data);
            return data;
        }
        dispatch({ type: "LOGIN_ERROR", error: data.message });
        return;
    } catch (error) {
        dispatch({ type: "LOGIN_ERROR", error: error });
    }
}

export async function signupUser(loginPayload) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload),
    };

    try {
        let response = await fetch(
            "https://todo-fs.herokuapp.com/api/signup",
            requestOptions
        );
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// LA FUNCION LOGOUT RECIBE UNA ACCION (DISPATCH) DE TIPO LOGOUT Y ELIMINA EL TOKEN Y LOS DATOS DE USUARIO DEL LOCALSTORAGE

export async function logout(dispatch) {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
}

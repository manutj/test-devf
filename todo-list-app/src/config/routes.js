import Login from "../pages/Login";
import Users from "../pages/Users";
import Tickets from "../pages/Tickets";
import NotFound from "../pages/NotFound";

//ARRAY DESDE DONDE SE RECOJEN LAS RUTAS DE LA APLICACION

const routes = [
    {
        exact: true,
        path: "/users",
        component: Users,
        isPrivate: true,
    },
    {
        exact: true,
        path: "/tickets",
        component: Tickets,
        isPrivate: true,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/",
        component: NotFound,
        isPrivate: true,
    },
    {
        path: "/*",
        component: NotFound,
    },
];

export default routes;

import Login from "../pages/Login";
import StaffTickets from "../pages/DashboardEmployees";
import EmployeeStaff from "../pages/DashboardAdmin";
import NotFound from "../pages/NotFound";
import Signup from "../pages/Signup";

//ARRAY DESDE DONDE SE RECOJEN LAS RUTAS DE LA APLICACION

const routes = [
    {
        exact: true,
        path: "/staff-tickets/:id/:role",
        component: StaffTickets,
        isPrivate: true,
    },
    {
        exact: true,
        path: "/staff",
        component: EmployeeStaff,
        isPrivate: true,
    },
    {
        exact: true,
        path: "/login",
        component: Login,
        isPrivate: false,
    },
    {
        exact: true,
        path: "/signup",
        component: Signup,
        isPrivate: false,
    },
    {
        path: "/",
        component: Signup,
        isPrivate: false,
    },
    {
        path: "/*",
        component: NotFound,
    },
];

export default routes;

import { BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./config/routes";
import { AuthProvider } from "./context";
import AppRoutes from "./components/AppRoutes";
import "./App.css";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    {routes.map((route) => (
                        <AppRoutes //COMPONENTE CREADO PARA RENDERIZAR A CADA UNA DE LAS RUTAS SEAN PUBLICAS O PRIVADAS (REEMPLAZA AL <ROUTE/> DEL ROUTER-DOM)
                            key={route.path}
                            path={route.path}
                            component={route.component}
                            isPrivate={route.isPrivate}
                        />
                    ))}
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
